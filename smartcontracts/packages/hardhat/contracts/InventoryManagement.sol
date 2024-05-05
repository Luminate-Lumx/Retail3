// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./UserManager.sol";
import "./LoyaltyRewards.sol";
import "./TransactionManager.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Product structure
 * @dev Stores details about products available in the inventory
 */
struct Product {
	uint128 code;
	string ipfsHash; // IPFS hash for product image or metadata
	string name;
	string[] tags; // Product tags for search and categorization
	uint32 price;
	uint32 score; // Loyalty score associated with the product
}

/**
 * @title Inventory Management for Retailer's Products
 * @dev Manages adding, updating, and buying products in a decentralized store
 */
contract InventoryManagement {
	// Mapping from retailer address to list of products
	mapping(address => Product[]) public retailerProducts;
	// Mapping from retailer address and product code to stock count
	mapping(address => mapping(uint128 => uint32)) public productStock;

	UserManager userManager;
	LoyaltyRewards loyaltyRewards;
	TransactionManager transactionManager;

	IERC20 public paymentToken;

	// Events to emit on various operations
	event ProductAdded(address retailer, uint128 productCode);
	event ProductUpdated(address retailer, uint128 productCode);
	event ProductRemoved(address retailer, uint128 productCode);
	event ProductBought(
		address buyer,
		address retailer,
		string productName,
		uint32 quantity
	);

	/**
	 * @dev Sets the essential addresses for interacting with other contracts and tokens
	 * @param userManagerAddress Address of the UserManager contract
	 * @param paymentTokenAddress Address of the payment token contract (ERC20)
	 * @param loyaltyRewardsAddress Address of the LoyaltyRewards contract
	 * @param transactionManagerAddress Address of the TransactionManager contract
	 */
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

	/**
	 * @dev Restricts functions to be callable only by verified retailers
	 */
	modifier onlyRetailer() {
		require(
			userManager.isRetailer(msg.sender),
			"Only retailers can call this function"
		);
		_;
	}

	/**
	 * @dev Adds a new product to the retailer's inventory
	 * @param productCode Unique code for the product
	 * @param ipfsHash IPFS hash containing product information
	 * @param name Product name
	 * @param tags Array of tags for categorization
	 * @param price Price of the product in smallest token units
	 * @param stock Initial stock quantity
	 * @param score Loyalty score awarded for purchasing this product
	 */
	function addProduct(
		uint128 productCode,
		string memory ipfsHash,
		string memory name,
		string[] memory tags,
		uint32 price,
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
				score: score
			})
		);
		productStock[msg.sender][productCode] = stock;

		emit ProductAdded(msg.sender, productCode);
	}

	/**
	 * @dev Updates existing product details
	 * @param index Index of the product in the retailer's product array
	 * @param name New name for the product
	 * @param price New price for the product
	 * @param stock Updated stock quantity
	 * @param score Updated loyalty score for the product
	 */
	function updateProduct(
		uint32 index,
		string memory name,
		uint32 price,
		uint32 stock,
		uint32 score
	) public onlyRetailer {
		require(
			index < retailerProducts[msg.sender].length,
			"Product index out of range"
		);
		Product storage product = retailerProducts[msg.sender][index];
		require(product.code != 0, "Product not found");

		product.name = name;
		product.price = price;
		product.score = score;
		productStock[msg.sender][product.code] = stock;

		emit ProductUpdated(msg.sender, product.code);
	}

	/**
	 * @dev Removes a product from the retailer's inventory
	 * @param retailerAddress Address of the retailer
	 * @param index Index of the product to remove
	 */
	function removeProduct(
		address retailerAddress,
		uint32 index
	) public onlyRetailer {
		require(
			index < retailerProducts[retailerAddress].length,
			"Product index out of range"
		);
		Product storage product = retailerProducts[retailerAddress][index];
		delete productStock[retailerAddress][product.code];
		delete retailerProducts[retailerAddress][index];

		emit ProductRemoved(retailerAddress, product.code);
	}

	/**
	 * @dev Facilitates the purchase of a product from a retailer's inventory
	 * @param retailerAddress Address of the retailer
	 * @param index Index of the product to buy
	 * @param quantity Quantity of the product to buy
	 */
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
		uint32 stock = productStock[retailerAddress][product.code];
		require(stock >= quantity, "Not enough stock");

		uint32 totalCost = product.price * quantity;
		uint32 totalScore = product.score * quantity;
		uint32 pollContribution = totalCost / 100;

		require(
			paymentToken.transferFrom(
				msg.sender,
				retailerAddress,
				totalCost - pollContribution
			),
			"Payment failed"
		);

		productStock[retailerAddress][product.code] -= quantity;
		loyaltyRewards.addScore(retailerAddress, msg.sender, totalScore);

		loyaltyRewards.contributeToPool(retailerAddress, pollContribution);
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

	/**
	 * @dev Retrieves all products of a specific retailer
	 * @param retailerAddress Address of the retailer
	 * @return List of products
	 */
	function getProducts(
		address retailerAddress
	) public view returns (Product[] memory) {
		return retailerProducts[retailerAddress];
	}

	/**
	 * @dev Retrieves a specific product of a retailer
	 * @param retailerAddress Address of the retailer
	 * @param index Index of the product
	 * @return Single product details
	 */
	function getProduct(
		address retailerAddress,
		uint32 index
	) public view returns (Product memory) {
		return retailerProducts[retailerAddress][index];
	}
}
