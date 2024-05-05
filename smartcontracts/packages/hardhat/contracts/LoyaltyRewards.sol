// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./RetailerWallet.sol";

contract LoyaltyRewards {
	mapping(address => mapping(address => uint32)) public scores;
	mapping(address => uint64) public scorePool;
	mapping(address => RetailerWallet) public retailerWallets;

	address private authorizedContract;
	IERC20 public paymentToken;

	event RedeemScore(address indexed user, uint32 score, uint256 redeemTokens);
	event ContributeToPool(address indexed retailer, uint256 amount);
	event AddScore(address indexed user, uint32 score);
	event TransferScore(address from, address to, uint32 score);

	constructor(address _paymentTokenAddress) {
		paymentToken = IERC20(_paymentTokenAddress);
		authorizedContract = msg.sender;
	}

	modifier onlyAuthorized() {
		require(
			msg.sender == authorizedContract,
			"Unauthorized: caller is not the authorized contract"
		);
		_;
	}

	function setAuthorizedContract(
		address _authorizedContract
	) public onlyAuthorized {
		authorizedContract = _authorizedContract;
	}

	function addScore(
		address retailer,
		address userAddress,
		uint32 score
	) public onlyAuthorized {
		scores[retailer][userAddress] += score;
		scorePool[retailer] += score;
		emit AddScore(userAddress, score);
	}

	function createWalletIfNotExists(address retailer) public onlyAuthorized {
		if (address(retailerWallets[retailer]) == address(0)) {
			retailerWallets[retailer] = new RetailerWallet(
				address(this),
				address(paymentToken)
			);
		}
	}

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

	function transferScore(address retailer, address to, uint32 score) public {
		require(scores[retailer][msg.sender] >= score, "Insufficient score");
		scores[retailer][msg.sender] -= score;
		scores[retailer][to] += score;
		emit TransferScore(msg.sender, to, score);
	}

	function calculateRedeemTokens(
		address retailer,
		uint32 score
	) public view returns (uint256) {
		uint256 balance = retailerWallets[retailer].balance();
		if (scorePool[retailer] == 0) return 0;
		return (balance * score) / scorePool[retailer];
	}

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

	function getScore(
		address retailer,
		address user
	) public view returns (uint32) {
		return scores[retailer][user];
	}

	function getScorePool(address retailer) public view returns (uint64) {
		return scorePool[retailer];
	}

	function getRedeemPool(address retailer) public view returns (uint256) {
		return retailerWallets[retailer].balance();
	}

	function getWalletAddress(address retailer) public view returns (address) {
		require(
			address(retailerWallets[retailer]) != address(0),
			"No wallet for retailer"
		);
		return address(retailerWallets[retailer]);
	}
}
