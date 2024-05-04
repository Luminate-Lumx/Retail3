// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./InventoryManagement.sol";
import "./UserManager.sol";

contract TransactionManager {
	struct Transaction {
		User buyer;
		Retailer retailer;
		Product product;
		uint quantity;
		uint totalPrice;
		uint totalScore;
		uint timestamp;
	}

	Transaction[] public transactions;
	mapping(address => uint[]) public userTransactions;
	mapping(address => uint[]) public retailerTransactions;

	InventoryManagement inventoryManagement;
	UserManager userManager;

	constructor(
		address _inventoryManagementAddress,
		address _userManagerAddress
	) {
		inventoryManagement = InventoryManagement(_inventoryManagementAddress);
		userManager = UserManager(_userManagerAddress);
	}

	modifier onlyInventoryManager() {
		require(
			msg.sender == address(inventoryManagement),
			"Only InventoryManager can call this function"
		);
		_;
	}

	function recordTransaction(
		address _buyerAddress,
		address _retailerAddress,
		uint _productIndex,
		uint _quantity,
		uint _totalCost,
		uint _totalScore
	) external onlyInventoryManager {
		User memory buyer = userManager.getUser(_buyerAddress);
		Retailer memory retailer = userManager.getRetailer(_retailerAddress);
		Product memory product = inventoryManagement.getProductOfRetailer(
			_retailerAddress,
			_productIndex
		);

		Transaction memory transaction = Transaction(
			buyer,
			retailer,
			product,
			_quantity,
			_totalCost,
			_totalScore,
			block.timestamp
		);

		transactions.push(transaction);

		userTransactions[_buyerAddress].push(transactions.length - 1);
		retailerTransactions[_retailerAddress].push(transactions.length - 1);
	}

	function getTransaction(
		uint _index
	) external view returns (Transaction memory) {
		return transactions[_index];
	}

	function getUserTransactions(
		address _userAddress
	) external view returns (Transaction[] memory) {
		uint[] memory userTransactionIndexes = userTransactions[_userAddress];
		Transaction[] memory userTransactionsArray = new Transaction[](
			userTransactionIndexes.length
		);

		for (uint i = 0; i < userTransactionIndexes.length; i++) {
			userTransactionsArray[i] = transactions[userTransactionIndexes[i]];
		}

		return userTransactionsArray;
	}

	function getRetailerTransactions(
		address _retailerAddress
	) external view returns (Transaction[] memory) {
		uint[] memory retailerTransactionIndexes = retailerTransactions[
			_retailerAddress
		];
		Transaction[] memory retailerTransactionsArray = new Transaction[](
			retailerTransactionIndexes.length
		);

		for (uint i = 0; i < retailerTransactionIndexes.length; i++) {
			retailerTransactionsArray[i] = transactions[
				retailerTransactionIndexes[i]
			];
		}

		return retailerTransactionsArray;
	}
}
