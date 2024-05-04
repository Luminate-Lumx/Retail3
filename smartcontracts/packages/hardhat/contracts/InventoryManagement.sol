// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./UserManager.sol";
import "./LoyaltyRewards.sol";
import "./TransactionManager.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

struct Product {
	uint code;
	string ipfsHash;
	string name;
	string[] tags;
	uint price;
	uint score;
}

contract InventoryManagement {
	mapping(address => Product[]) public retailerProducts;
	mapping(address => mapping(uint => uint)) public productStock;

	UserManager userManager;
	LoyaltyRewards loyaltyRewards;
	TransactionManager private transactionManager;

	IERC20 public paymentToken;

	constructor(
		address _userManagerAddress,
		address _paymentTokenAddress,
		address _transactionManagerAddress
	) {
		paymentToken = IERC20(_paymentTokenAddress);
		userManager = UserManager(_userManagerAddress);
		transactionManager = TransactionManager(
			_transactionManagerAddress,
			_userManagerAddress
		);
		loyaltyRewards = new LoyaltyRewards(
			address(this),
			_paymentTokenAddress
		);
	}

	modifier onlyRetailer() {
		require(
			userManager.isRetailer(msg.sender),
			"Only retailers can call this function"
		);
		_;
	}

	function addProduct(
		uint _productCode,
		string memory _ipfsHash,
		string memory _name,
		string[] memory _tags,
		uint _price,
		uint _stock,
		uint _score
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
	}

	function updateProduct(
		uint _index,
		string memory _name,
		uint _price,
		uint _stock,
		uint _score
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
	}

	function removeProduct(
		uint _retailerAddress,
		uint _index
	) public onlyRetailer {
		require(
			_index < retailerProducts[_retailerAddress].length,
			"Product index out of range"
		);
		Product storage product = retailerProducts[_retailerAddress][_index];
		delete productStock[_retailerAddress][product.code];
		delete retailerProducts[_retailerAddress][_index];
	}

	function buyProduct(
		uint _retailerAddress,
		uint _index,
		uint _quantity
	) public {
		require(
			_index < retailerProducts[_retailerAddress].length,
			"Product index out of range"
		);
		Product storage product = retailerProducts[_retailerAddress][_index];
		uint stock = productStock[_retailerAddress][product.code];
		require(stock >= _quantity, "Not enough stock");

		uint totalCost = product.price * _quantity;
		require(
			paymentToken.transferFrom(msg.sender, address(this), totalCost),
			"Payment failed"
		);

		productStock[_retailerAddress][product.code] -= _quantity;
		loyaltyRewards.addScore(msg.sender, product.score * _quantity);

		uint pollContribution = totalCost / 100;
		loyaltyRewards.contributeToPoll(pollContribution);
		transactionManager.recordTransaction(
			msg.sender,
			address(this),
			product.code,
			_quantity,
			totalCost
		);
	}

	function getProducts(
		address _retailerAddress
	) public view returns (Product[] memory) {
		return retailerProducts[_retailerAddress];
	}

	function getProductOfRetailer(
		address _retailerAddress,
		uint _index
	) public view returns (Product memory) {
		return retailerProducts[_retailerAddress][_index];
	}
}
