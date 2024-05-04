// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./UserManager.sol";
import "./LoyaltyRewards.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract InventoryManagement {
	struct Product {
		uint code;
		string name;
		uint price;
		uint stock;
		uint score;
	}

	mapping(uint => Product[]) public retailerProducts;

	UserManager userManager;
	LoyaltyRewards loyaltyRewards;

	IERC20 public paymentToken;

	constructor(address userManagerAddress, address _paymentTokenAddress) {
		paymentToken = IERC20(_paymentTokenAddress);
		userManager = UserManager(userManagerAddress);
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
		uint _retailerId,
		uint _productCode,
		string memory _name,
		uint _price,
		uint _stock,
		uint _score
	) public onlyRetailer {
		retailerProducts[_retailerId].push(
			Product({
				code: _productCode,
				name: _name,
				price: _price,
				stock: _stock,
				score: _score
			})
		);
	}

	function updateProduct(
		uint _retailerId,
		uint _index,
		string memory _name,
		uint _price,
		uint _stock,
		uint _score
	) public onlyRetailer {
		require(
			_index < retailerProducts[_retailerId].length,
			"Product index out of range"
		);
		Product storage product = retailerProducts[_retailerId][_index];
		require(product.code != 0, "Product not found");

		product.name = _name;
		product.price = _price;
		product.stock = _stock;
		product.score = _score;
	}

	function removeProduct(uint _retailerId, uint _index) public onlyRetailer {
		require(
			_index < retailerProducts[_retailerId].length,
			"Product index out of range"
		);
		delete retailerProducts[_retailerId][_index];
	}

	function buyProduct(uint _retailerId, uint _index, uint _quantity) public {
		require(
			_index < retailerProducts[_retailerId].length,
			"Product index out of range"
		);
		Product storage product = retailerProducts[_retailerId][_index];
		require(product.stock >= _quantity, "Not enough stock");

		uint totalCost = product.price * _quantity;
		require(
			paymentToken.transferFrom(msg.sender, address(this), totalCost),
			"Payment failed"
		);

		product.stock -= _quantity;
		loyaltyRewards.addScore(msg.sender, product.score * _quantity);

		uint pollContribution = totalCost / 100;
		loyaltyRewards.contributeToPoll(pollContribution);
	}
}
