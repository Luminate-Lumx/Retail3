// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./RetailerWallet.sol";

/**
 * @title Loyalty Rewards
 * @dev Manages loyalty points for retailers and customers in a retail ecosystem
 */
contract LoyaltyRewards {
	// Maps a retailer to a user and their associated loyalty score
	mapping(address => mapping(address => uint32)) public scores;
	// Total scores pool per retailer
	mapping(address => uint64) public scorePool;
	// Total redeem pool per retailer
	mapping(address => RetailerWallet) public retailerWallets;

	// Address of the authorized contract that can call restricted functions
	address private authorizedContract;

	// ERC20 token used for handling payments and rewards
	IERC20 public paymentToken;

	/**
	 * @dev Constructor to initialize the Loyalty Rewards contract
	 * @param _authorizedContract Address of the contract authorized to call restricted methods
	 * @param _paymentTokenAddress ERC20 token address for handling rewards and payments
	 */
	constructor(address _authorizedContract, address _paymentTokenAddress) {
		paymentToken = IERC20(_paymentTokenAddress);
		authorizedContract = _authorizedContract;
	}

	// Events to emit on various operations
	event RedeemScore(address user, uint32 score, uint64 redeemTokens);
	event ContributeToPool(uint32 amount);
	event AddScore(address user, uint32 score);
	event TransferScore(address from, address to, uint32 score);

	/**
	 * @dev Ensures only the authorized contract can call certain functions
	 */
	modifier onlyAuthorized() {
		require(
			msg.sender == authorizedContract,
			"Unauthorized: caller is not the authorized contract"
		);
		_;
	}

	/**
	 * @dev Adds loyalty score for a user under a specific retailer
	 * @param retail Address of the retailer
	 * @param userAddress Address of the user
	 * @param score Amount of score to add
	 */
	function addScore(
		address retail,
		address userAddress,
		uint32 score
	) public onlyAuthorized {
		scores[retail][userAddress] += score;
		scorePool[retail] += score;
		emit AddScore(userAddress, score);
	}

	/**
	 * @dev Creates a new wallet for a retailer if it does not exist
	 * @param retailer Address of the retailer
	 * @return RetailerWallet The retailer's wallet
	 */
	function createOrGetWallet(
		address retailer
	) internal returns (RetailerWallet) {
		if (address(retailerWallets[retailer]) == address(0)) {
			retailerWallets[retailer] = new RetailerWallet(
				address(this),
				address(paymentToken)
			);
		}
		return retailerWallets[retailer];
	}

	/**
	 * @dev Redeems loyalty score for tokens from the redeem pool (From retailer wallet to user)
	 * @param retail Address of the retailer
	 * @param score Amount of score to redeem
	 */
	function redeemScore(address retail, uint32 score) public {
		require(scores[retail][msg.sender] >= score, "Insufficient score");
		uint256 redeemTokens = calculateRedeemTokens(retail, score);

		RetailerWallet wallet = retailerWallets[retail];
		require(wallet.balance() >= redeemTokens, "Insufficient funds in pool");

		scores[retail][msg.sender] -= score;
		scorePool[retail] -= score;

		wallet.withdrawTokens(msg.sender, redeemTokens);
	}

	/**
	 * @dev Transfers score from one user to another under the same retailer
	 * @param retailer Address of the retailer
	 * @param to Address of the recipient
	 * @param score Amount of score to transfer
	 */
	function transferScore(address retailer, address to, uint32 score) public {
		require(
			scores[retailer][msg.sender] >= score,
			"Sender does not have enough score"
		);

		scores[retailer][msg.sender] -= score;
		scores[retailer][to] += score;

		emit TransferScore(msg.sender, to, score);
	}

	/**
	 * @dev Calculates the amount of tokens to redeem based on the score
	 * @param retailer Address of the retailer
	 * @param score Amount of score to redeem
	 * @return redeemTokens Amount of tokens to redeem
	 */
	function calculateRedeemTokens(
		address retailer,
		uint32 score
	) public view returns (uint256) {
		uint256 tokensPerScoreUnit = retailerWallets[retailer].balance() /
			scorePool[retailer];
		return uint256(score) * tokensPerScoreUnit;
	}

	/**
	 * @dev Contributes tokens to the pool for a retailer
	 * @param retailer Address of the retailer
	 * @param user Address of the user
	 * @param amount Amount of tokens to contribute
	 */
	function contributeToPool(
		address retailer,
		address user,
		uint256 amount
	) public onlyAuthorized {
		RetailerWallet wallet = createOrGetWallet(retailer);
		wallet.receiveTokens(user, amount);
	}

	/**
	 * @dev Gets the loyalty score of a user under a retailer
	 * @param retailer Address of the retailer
	 * @param user Address of the user
	 * @return score The loyalty score of the user
	 */
	function getScore(
		address retailer,
		address user
	) public view returns (uint32 score) {
		return scores[retailer][user];
	}

	/**
	 * @dev Gets the score pool of a retailer
	 * @param retailer Address of the retailer
	 * @return scorePool The total score pool of the retailer
	 */
	function getScorePool(address retailer) public view returns (uint64) {
		return scorePool[retailer];
	}

	/**
	 * @dev Gets the redeem pool of a retailer
	 * @param retailer Address of the retailer
	 * @return redeemPool The total redeem pool of the retailer
	 */
	function getRedeemPool(address retailer) public view returns (uint256) {
		return retailerWallets[retailer].balance();
	}
}
