// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./RetailerWallet.sol";
import "hardhat/console.sol";
/**
 * @title Loyalty Rewards System
 * @notice Manages the allocation, redemption, and transfer of loyalty points within a retail ecosystem
 * @dev This contract handles loyalty points accrual, redemption, and inter-user transfers, along with retailer-specific wallets management.
 */
contract LoyaltyRewards {
	// State variables
	mapping(address => mapping(address => uint32)) public scores; // Nested mapping of retailers to users to loyalty points
	mapping(address => uint64) public scorePool; // Total available loyalty points per retailer
	mapping(address => RetailerWallet) public retailerWallets; // Mapping of retailer addresses to their associated wallet contracts

	address private authorizedContract; // Address of the contract authorized to call restricted functions
	IERC20 public paymentToken; // ERC20 token used for transactions within the system

	// Events
	event RedeemScore(address indexed user, uint32 score, uint256 redeemTokens);
	event ContributeToPool(address indexed retailer, uint256 amount);
	event AddScore(address indexed user, uint32 score);
	event TransferScore(address from, address to, uint32 score);

	// Modifiers
	/**
	 * @notice Ensures only the authorized contract can execute certain functions
	 * @dev Restricts function calls to the address stored in `authorizedContract`.
	 */
	modifier onlyAuthorized() {
		require(
			msg.sender == authorizedContract,
			"Unauthorized: caller is not the authorized contract"
		);
		_;
	}

	// Constructor
	/**
	 * @notice Initializes the LoyaltyRewards contract with a specific payment token.
	 * @param _paymentTokenAddress Address of the ERC20 token used for payments and rewards.
	 */
	constructor(address _paymentTokenAddress) {
		paymentToken = IERC20(_paymentTokenAddress);
		authorizedContract = msg.sender; // Typically, this contract would be deployed by a factory or main contract managing the ecosystem.
	}

	// Functions
	/**
	 * @notice Sets a new authorized contract address.
	 * @dev Updates the authorized contract address. Can only be called by the current authorized contract.
	 * @param _authorizedContract New authorized contract address.
	 */
	function setAuthorizedContract(
		address _authorizedContract
	) public onlyAuthorized {
		authorizedContract = _authorizedContract;
	}

	/**
	 * @notice Adds loyalty score to a user under a specific retailer.
	 * @dev Credits loyalty points to both the user's and retailer's total scores. Emits an AddScore event.
	 * @param retailer Address of the retailer.
	 * @param userAddress Address of the user receiving the points.
	 * @param score Amount of loyalty score to add.
	 */
	function addScore(
		address retailer,
		address userAddress,
		uint32 score
	) public onlyAuthorized {
		scores[retailer][userAddress] += score;
		scorePool[retailer] += score;
		emit AddScore(userAddress, score);
	}

	/**
	 * @notice Creates a wallet for the retailer if it does not already exist.
	 * @dev Ensures a single wallet is associated with each retailer for managing redemption funds.
	 * @param retailer Address of the retailer.
	 */
	function createWalletIfNotExists(address retailer) public onlyAuthorized {
		if (address(retailerWallets[retailer]) == address(0)) {
			retailerWallets[retailer] = new RetailerWallet(
				address(this),
				address(paymentToken)
			);
		}
	}

	/**
	 * @notice Redeems loyalty score for tokens.
	 * @dev Deducts loyalty points from the user's balance and transfers equivalent tokens from the retailer's wallet. Emits a RedeemScore event.
	 * @param retailer Address of the retailer.
	 * @param score Amount of loyalty score to redeem.
	 */
	function redeemScore(address retailer, uint32 score) public {
		require(scores[retailer][msg.sender] >= score, "Insufficient score");
		uint256 redeemTokens = calculateRedeemTokens(retailer, score);
		require(redeemTokens > 0, "Redeem amount invalid");

		RetailerWallet wallet = retailerWallets[retailer];
		require(wallet.balance() >= redeemTokens, "Insufficient funds in pool");

		scores[retailer][msg.sender] -= score;
		scorePool[retailer] -= score;
		wallet.withdrawTokens(msg.sender, redeemTokens);

		emit RedeemScore(msg.sender, score, redeemTokens);
	}

	/**
	 * @notice Transfers loyalty score from one user to another under the same retailer.
	 * @dev Allows users to transfer loyalty points to each other, ensuring sufficient balance before proceeding. Emits a TransferScore event.
	 * @param retailer Address of the retailer where both users are registered.
	 * @param to Address of the recipient receiving the score.
	 * @param score Amount of loyalty score to transfer.
	 */
	function transferScore(address retailer, address to, uint32 score) public {
		require(scores[retailer][msg.sender] >= score, "Insufficient score");
		scores[retailer][msg.sender] -= score;
		scores[retailer][to] += score;
		emit TransferScore(msg.sender, to, score);
	}

	/**
	 * @notice Calculates the amount of tokens that can be redeemed for a given score.
	 * @dev Determines how many tokens a score is worth based on the current pool balance and total score.
	 * @param retailer Address of the retailer.
	 * @param score Amount of loyalty score to calculate tokens for.
	 * @return redeemTokens The number of tokens that the score is worth.
	 */
	function calculateRedeemTokens(
		address retailer,
		uint32 score
	) public view returns (uint256) {
		uint256 balance = retailerWallets[retailer].balance();
		if (scorePool[retailer] == 0) return 0; // Prevents division by zero errors
		return (balance * score) / scorePool[retailer];
	}

	/**
	 * @notice Contributes tokens to a retailer's loyalty pool.
	 * @dev Adds funds to the retailer's wallet for future redemptions. Requires authorization. Emits ContributeToPool event.
	 * @param retailer Address of the retailer.
	 * @param vault Address from which tokens are transferred.
	 * @param amount Amount of tokens to contribute.
	 */
	function contributeToPool(
		address retailer,
		address vault,
		uint256 amount
	) public onlyAuthorized {
		RetailerWallet wallet = retailerWallets[retailer];
		require(
			wallet != RetailerWallet(address(0)),
			"Retailer wallet does not exist"
		);
		wallet.receiveTokens(vault, address(wallet), amount);
		emit ContributeToPool(retailer, amount);
	}

	/**
	 * @notice Retrieves the loyalty score of a user under a specific retailer.
	 * @param retailer Address of the retailer.
	 * @param user Address of the user.
	 * @return The loyalty score of the user.
	 */
	function getScore(
		address retailer,
		address user
	) public view returns (uint32) {
		return scores[retailer][user];
	}

	/**
	 * @notice Retrieves the total loyalty score pool of a retailer.
	 * @param retailer Address of the retailer.
	 * @return The total score pool of the retailer.
	 */
	function getScorePool(address retailer) public view returns (uint64) {
		return scorePool[retailer];
	}

	/**
	 * @notice Retrieves the total redeemable tokens available in a retailer's wallet.
	 * @param retailer Address of the retailer.
	 * @return The balance of redeemable tokens available.
	 */
	function getRedeemPool(address retailer) public view returns (uint256) {
		return retailerWallets[retailer].balance();
	}

	/**
	 * @notice Gets the wallet address associated with a retailer.
	 * @param retailer Address of the retailer.
	 * @return The address of the retailer's wallet.
	 */
	function getWalletAddress(address retailer) public view returns (address) {
		require(
			address(retailerWallets[retailer]) != address(0),
			"No wallet for retailer"
		);
		return address(retailerWallets[retailer]);
	}
}
