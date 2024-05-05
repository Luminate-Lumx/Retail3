// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./UserManager.sol";
import "./LoyaltyRewards.sol";
import "./TransactionManager.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

struct Product {
	uint128 code;
	string ipfsHash;
	string name;
	string[] tags;
	uint256 price;
	uint32 score;
	bool removed;
}

contract InventoryManagement {
	mapping(address => Product[]) public retailerProducts;
	mapping(address => mapping(uint128 => uint32)) public productStock;

	UserManager userManager;
	LoyaltyRewards loyaltyRewards;
	TransactionManager transactionManager;
	IERC20 public paymentToken;

	event ProductAdded(address indexed retailer, uint128 productCode);
	event ProductUpdated(address indexed retailer, uint128 productCode);
	event ProductRemoved(address indexed retailer, uint128 productCode);
	event ProductBought(
		address buyer,
		address retailer,
		string productName,
		uint32 quantity
	);

	constructor(
		address userManagerAddress,
		address paymentTokenAddress,
		address loyaltyRewardsAddress,
		address transactionManagerAddress
	) {
		paymentToken = IERC20(paymentTokenAddress);
		userManager = UserManager(userManagerAddress);
		transactionManager = TransactionManager(transactionManagerAddress);
		loyaltyRewards = LoyaltyRewards(loyaltyRewardsAddress);
	}

	modifier onlyRetailer() {
		require(
			userManager.isRetailer(msg.sender),
			"Only retailers can call this function"
		);
		_;
	}

	function addProduct(
		uint128 productCode,
		string memory ipfsHash,
		string memory name,
		string[] memory tags,
		uint256 price,
		uint32 stock,
		uint32 score
	) public onlyRetailer {
		retailerProducts[msg.sender].push(
			Product({
				code: productCode,
				ipfsHash: ipfsHash,
				name: name,
				tags: tags,
				price: price,
				score: score,
				removed: false
			})
		);
		productStock[msg.sender][productCode] = stock;
		emit ProductAdded(msg.sender, productCode);
	}

	function updateProduct(
		uint32 index,
		string memory name,
		string[] memory tags,
		uint256 price,
		uint32 stock,
		uint32 score
	) public onlyRetailer {
		require(
			index < retailerProducts[msg.sender].length,
			"Product index out of range"
		);
		Product storage product = retailerProducts[msg.sender][index];
		require(!product.removed, "Product has been removed");

		product.name = name;
		product.tags = tags;
		product.price = price;
		product.score = score;
		productStock[msg.sender][product.code] = stock;

		emit ProductUpdated(msg.sender, product.code);
	}

	function removeProduct(
		address retailerAddress,
		uint32 index
	) public onlyRetailer {
		require(retailerAddress == msg.sender, "Unauthorized access");
		require(
			index < retailerProducts[retailerAddress].length,
			"Product index out of range"
		);
		Product storage product = retailerProducts[retailerAddress][index];
		require(!product.removed, "Product already removed");

		product.removed = true;
		emit ProductRemoved(retailerAddress, product.code);
	}

	function buyProduct(
		address retailerAddress,
		uint32 index,
		uint16 quantity
	) public {
		require(
			index < retailerProducts[retailerAddress].length,
			"Product index out of range"
		);

		Product storage product = retailerProducts[retailerAddress][index];

		require(product.code != 0, "Product not found");
		require(!product.removed, "Product removed");

		uint32 stock = productStock[retailerAddress][product.code];
		require(stock >= quantity, "Not enough stock");

		uint256 totalCost = product.price * quantity;
		uint32 totalScore = product.score * quantity;
		uint256 pollContribution = totalCost / 100;

		require(
			paymentToken.transferFrom(msg.sender, address(this), totalCost),
			"Payment failed"
		);

		require(
			paymentToken.transfer(
				retailerAddress,
				totalCost - pollContribution
			),
			"Payment failed"
		);

		productStock[retailerAddress][product.code] -= quantity;
		loyaltyRewards.addScore(retailerAddress, msg.sender, totalScore);

		loyaltyRewards.createWalletIfNotExists(retailerAddress);
		paymentToken.approve(
			loyaltyRewards.getWalletAddress(retailerAddress),
			pollContribution
		);

		loyaltyRewards.contributeToPool(
			retailerAddress,
			address(this),
			pollContribution
		);

		transactionManager.recordTransaction(
			msg.sender,
			retailerAddress,
			index,
			quantity,
			totalCost,
			totalScore
		);

		emit ProductBought(msg.sender, retailerAddress, product.name, quantity);
	}

	function getProducts(
		address retailerAddress
	) public view returns (Product[] memory) {
		return retailerProducts[retailerAddress];
	}

	function getProduct(
		address retailerAddress,
		uint32 index
	) public view returns (Product memory) {
		require(
			index < retailerProducts[retailerAddress].length,
			"Product index out of range"
		);
		return retailerProducts[retailerAddress][index];
	}

	function getProductStock(
		address retailerAddress,
		uint128 productCode
	) public view returns (uint32) {
		return productStock[retailerAddress][productCode];
	}
}
