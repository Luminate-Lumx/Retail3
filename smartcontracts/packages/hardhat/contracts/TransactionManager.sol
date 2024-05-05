// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./InventoryManagement.sol";
import "./UserManager.sol";

struct Transaction {
	address buyer;
	address retailer;
	uint32 productIndex;
	uint16 quantity;
	uint256 totalPrice;
	uint32 totalScore;
	uint256 timestamp;
}

contract TransactionManager {
	Transaction[] public transactions;
	mapping(address => uint[]) public userTransactions;
	mapping(address => uint[]) public retailerTransactions;

	InventoryManagement public inventoryManagement;
	UserManager public userManager;

	address public owner;

	constructor(address userManagerAddress) {
		owner = msg.sender;
		userManager = UserManager(userManagerAddress);
	}

	modifier onlyInventoryManager() {
		require(
			msg.sender == address(inventoryManagement),
			"Only InventoryManager can call this function"
		);
		_;
	}

	modifier onlyOwner() {
		require(msg.sender == owner, "Only owner can call this function");
		_;
	}

	function setInventoryManagement(
		address inventoryManagementAddress
	) external onlyOwner {
		inventoryManagement = InventoryManagement(inventoryManagementAddress);
	}

	function recordTransaction(
		address buyerAddress,
		address retailerAddress,
		uint32 productIndex,
		uint16 quantity,
		uint256 totalCost,
		uint32 totalScore
	) external onlyInventoryManager {
		transactions.push(
			Transaction(
				buyerAddress,
				retailerAddress,
				productIndex,
				quantity,
				totalCost,
				totalScore,
				block.timestamp
			)
		);

		uint index = transactions.length - 1;
		userTransactions[buyerAddress].push(index);
		retailerTransactions[retailerAddress].push(index);
	}

	function getTransaction(
		uint32 index
	) external view returns (Transaction memory) {
		return transactions[index];
	}

	function getUserTransactions(
		address userAddress
	) external view returns (Transaction[] memory) {
		uint[] memory indexes = userTransactions[userAddress];
		Transaction[] memory result = new Transaction[](indexes.length);
		for (uint i = 0; i < indexes.length; i++) {
			result[i] = transactions[indexes[i]];
		}
		return result;
	}

	function getRetailerTransactions(
		address retailerAddress
	) external view returns (Transaction[] memory) {
		uint[] memory indexes = retailerTransactions[retailerAddress];
		Transaction[] memory result = new Transaction[](indexes.length);
		for (uint i = 0; i < indexes.length; i++) {
			result[i] = transactions[indexes[i]];
		}
		return result;
	}
}
