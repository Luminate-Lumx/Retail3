// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./UserManager.sol";
import "./LoyaltyRewards.sol";
import "./TransactionManager.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Product structure
 * @notice Stores details about products available in the retailer's inventory
 * @dev This struct is used for managing product information including pricing, stock, and loyalty scores.
 */
struct Product {
	uint128 code; // Unique product code
	string ipfsHash; // IPFS hash for storing product images or metadata
	string name; // Name of the product
	string[] tags; // Tags for search and categorization
	uint256 price; // Price of the product in smallest token units
	uint32 score; // Loyalty score awarded for purchasing this product
	bool removed; // Flag indicating whether the product is removed from the inventory
}

/**
 * @title Inventory Management for Retailer's Products
 * @notice Manages adding, updating, and buying products in a decentralized store environment
 * @dev This contract handles operations related to product management in a decentralized retail setup,
 * including adding new products, updating existing ones, and processing purchases.
 */
contract InventoryManagement {
	mapping(address => Product[]) public retailerProducts; // Mapping from retailer address to their list of products
	mapping(address => mapping(uint128 => uint32)) public productStock; // Mapping from retailer address and product code to stock count

	UserManager userManager; // UserManager contract instance
	LoyaltyRewards loyaltyRewards; // LoyaltyRewards contract instance
	TransactionManager transactionManager; // TransactionManager contract instance
	IERC20 public paymentToken; // ERC20 token used for payment

	// Events
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
		loyaltyRewards = LoyaltyRewards(loyaltyRewardsAddress);
		transactionManager = TransactionManager(transactionManagerAddress);
	}

	// Modifiers
	/**
	 * @notice Ensures that only verified retailers can perform certain actions
	 * @dev Modifier to restrict certain functions to be callable only by verified retailers.
	 */
	modifier onlyRetailer() {
		require(
			userManager.isRetailer(msg.sender),
			"Only retailers can call this function"
		);
		_;
	}

	// Functions
	/**
	 * @notice Adds a new product to the retailer's inventory
	 * @dev Adds a product to the retailer's inventory and initializes its stock. Emits the ProductAdded event.
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

	/**
	 * @notice Updates existing product details
	 * @dev Updates a product in the retailer's inventory and adjusts its stock. Emits the ProductUpdated event.
	 * @param index Index of the product in the retailer's product array
	 * @param name New name for the product
	 * @param tags New tags for the product
	 * @param price New price for the product
	 * @param stock Updated stock quantity
	 * @param score Updated loyalty score for the product
	 */
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

	/**
	 * @notice Removes a product from the retailer's inventory
	 * @dev Marks a product as removed in the retailer's inventory. Emits the ProductRemoved event.
	 * @param retailerAddress Address of the retailer
	 * @param index Index of the product to remove
	 */
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

	/**
	 * @notice Facilitates the purchase of a product from a retailer's inventory
	 * @dev Processes the purchase of a product, handles payment transfer, updates stock, and registers the transaction.
	 * Emits the ProductBought event and interacts with LoyaltyRewards and TransactionManager.
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

		require(product.code != 0, "Product not found");
		require(!product.removed, "Product removed");

		uint32 stock = productStock[retailerAddress][product.code];
		require(stock >= quantity, "Not enough stock");

		uint256 totalCost = product.price * quantity;
		uint32 totalScore = product.score * quantity;
		uint256 pollContribution = totalCost / 100;

		require(
			paymentToken.balanceOf(msg.sender) >= totalCost,
			"Insufficient balance"
		);

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

	/**
	 * @notice Retrieves all products of a specific retailer
	 * @param retailerAddress Address of the retailer
	 * @return Array of products
	 */
	function getProducts(
		address retailerAddress
	) public view returns (Product[] memory) {
		return retailerProducts[retailerAddress];
	}

	/**
	 * @notice Retrieves a specific product of a retailer
	 * @param retailerAddress Address of the retailer
	 * @param index Index of the product
	 * @return Single product details
	 */
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

	/**
	 * @notice Retrieves the stock of a specific product
	 * @param retailerAddress Address of the retailer
	 * @param productCode Code of the product
	 * @return Stock quantity
	 */
	function getProductStock(
		address retailerAddress,
		uint128 productCode
	) public view returns (uint32) {
		return productStock[retailerAddress][productCode];
	}
}
