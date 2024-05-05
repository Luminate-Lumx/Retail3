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
	 * @param _userManagerAddress Address of the UserManager contract
	 * @param _paymentTokenAddress Address of the payment token contract (ERC20)
	 * @param _loyaltyRewardsAddress Address of the LoyaltyRewards contract
	 * @param _transactionManagerAddress Address of the TransactionManager contract
	 */
	constructor(
		address _userManagerAddress,
		address _paymentTokenAddress,
		address _loyaltyRewardsAddress,
		address _transactionManagerAddress
	) {
		paymentToken = IERC20(_paymentTokenAddress);
		userManager = UserManager(_userManagerAddress);
		transactionManager = TransactionManager(_transactionManagerAddress);
		loyaltyRewards = LoyaltyRewards(_loyaltyRewardsAddress);
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
	 * @param _productCode Unique code for the product
	 * @param _ipfsHash IPFS hash containing product information
	 * @param _name Product name
	 * @param _tags Array of tags for categorization
	 * @param _price Price of the product in smallest token units
	 * @param _stock Initial stock quantity
	 * @param _score Loyalty score awarded for purchasing this product
	 */
	function addProduct(
		uint128 _productCode,
		string memory _ipfsHash,
		string memory _name,
		string[] memory _tags,
		uint32 _price,
		uint32 _stock,
		uint32 _score
	) public onlyRetailer {
		retailerProducts[msg.sender].push(
			Product({
				code: _productCode,
				ipfsHash: _ipfsHash,
				name: _name,
				tags: _tags,
				price: _price,
				score: _score
			})
		);
		productStock[msg.sender][_productCode] = _stock;

		emit ProductAdded(msg.sender, _productCode);
	}

	/**
	 * @dev Updates existing product details
	 * @param _index Index of the product in the retailer's product array
	 * @param _name New name for the product
	 * @param _price New price for the product
	 * @param _stock Updated stock quantity
	 * @param _score Updated loyalty score for the product
	 */
	function updateProduct(
		uint32 _index,
		string memory _name,
		uint32 _price,
		uint32 _stock,
		uint32 _score
	) public onlyRetailer {
		require(
			_index < retailerProducts[msg.sender].length,
			"Product index out of range"
		);
		Product storage product = retailerProducts[msg.sender][_index];
		require(product.code != 0, "Product not found");

		product.name = _name;
		product.price = _price;
		product.score = _score;
		productStock[msg.sender][product.code] = _stock;

		emit ProductUpdated(msg.sender, product.code);
	}

	/**
	 * @dev Removes a product from the retailer's inventory
	 * @param _retailerAddress Address of the retailer
	 * @param _index Index of the product to remove
	 */
	function removeProduct(
		address _retailerAddress,
		uint32 _index
	) public onlyRetailer {
		require(
			_index < retailerProducts[_retailerAddress].length,
			"Product index out of range"
		);
		Product storage product = retailerProducts[_retailerAddress][_index];
		delete productStock[_retailerAddress][product.code];
		delete retailerProducts[_retailerAddress][_index];

		emit ProductRemoved(_retailerAddress, product.code);
	}

	/**
	 * @dev Facilitates the purchase of a product from a retailer's inventory
	 * @param _retailerAddress Address of the retailer
	 * @param _index Index of the product to buy
	 * @param _quantity Quantity of the product to buy
	 */
	function buyProduct(
		address _retailerAddress,
		uint32 _index,
		uint16 _quantity
	) public {
		require(
			_index < retailerProducts[_retailerAddress].length,
			"Product index out of range"
		);
		Product storage product = retailerProducts[_retailerAddress][_index];
		uint32 stock = productStock[_retailerAddress][product.code];
		require(stock >= _quantity, "Not enough stock");

		uint32 totalCost = product.price * _quantity;
		uint32 totalScore = product.score * _quantity;
		require(
			paymentToken.transferFrom(msg.sender, address(this), totalCost),
			"Payment failed"
		);

		productStock[_retailerAddress][product.code] -= _quantity;
		loyaltyRewards.addScore(_retailerAddress, msg.sender, totalScore);

		uint32 pollContribution = totalCost / 100;
		loyaltyRewards.contributeToPool(pollContribution);
		transactionManager.recordTransaction(
			msg.sender,
			_retailerAddress,
			_index,
			_quantity,
			totalCost,
			totalScore
		);

		emit ProductBought(
			msg.sender,
			_retailerAddress,
			product.name,
			_quantity
		);
	}

	/**
	 * @dev Retrieves all products of a specific retailer
	 * @param _retailerAddress Address of the retailer
	 * @return List of products
	 */
	function getProducts(
		address _retailerAddress
	) public view returns (Product[] memory) {
		return retailerProducts[_retailerAddress];
	}

	/**
	 * @dev Retrieves a specific product of a retailer
	 * @param _retailerAddress Address of the retailer
	 * @param _index Index of the product
	 * @return Single product details
	 */
	function getProduct(
		address _retailerAddress,
		uint32 _index
	) public view returns (Product memory) {
		return retailerProducts[_retailerAddress][_index];
	}
}
