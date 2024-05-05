// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./InventoryManagement.sol";
import "./UserManager.sol";

/**
 * @title Transaction structure
 * @dev Stores details of a single transaction in the retail system
 */
struct Transaction {
	User buyer; // User who purchased the product
	Retailer retailer; // Retailer from whom the product was purchased
	Product product; // Details of the purchased product
	uint16 quantity; // Quantity of product purchased
	uint32 totalPrice; // Total price paid for the transaction
	uint32 totalScore; // Total loyalty score earned from the transaction
	uint256 timestamp; // Timestamp of when the transaction occurred
}

/**
 * @title Transaction Manager
 * @dev Manages the recording and retrieval of transactions within a retail environment
 */
contract TransactionManager {
	// Array to store all transactions
	Transaction[] public transactions;
	// Mapping from user address to list of transaction indices
	mapping(address => uint[]) public userTransactions;
	// Mapping from retailer address to list of transaction indices
	mapping(address => uint[]) public retailerTransactions;

	InventoryManagement inventoryManagement;
	UserManager userManager;

	address public owner;

	/**
	 * @dev Constructor to set initial owner and UserManager address
	 * @param userManagerAddress Address of the UserManager contract
	 */
	constructor(address userManagerAddress) {
		owner = msg.sender;
		userManager = UserManager(userManagerAddress);
	}

	/**
	 * @dev Modifier to ensure only the InventoryManagement contract can call certain functions
	 */
	modifier onlyInventoryManager() {
		require(
			msg.sender == address(inventoryManagement),
			"Only InventoryManager can call this function"
		);
		_;
	}

	/**
	 * @dev Modifier to ensure only the owner can call certain functions
	 */
	modifier onlyOwner() {
		require(msg.sender == owner, "Only owner can call this function");
		_;
	}

	/**
	 * @dev Sets the InventoryManagement contract address
	 * @param inventoryManagementAddress Address of the InventoryManagement contract
	 */
	function setInventoryManagement(
		address inventoryManagementAddress
	) external onlyOwner {
		inventoryManagement = InventoryManagement(inventoryManagementAddress);
	}

	/**
	 * @dev Records a transaction into the ledger
	 * @param buyerAddress Address of the buyer
	 * @param retailerAddress Address of the retailer
	 * @param productIndex Index of the product in the retailer's inventory
	 * @param quantity Quantity of the product bought
	 * @param totalCost Total cost of the transaction
	 * @param totalScore Total loyalty score earned from the transaction
	 */
	function recordTransaction(
		address buyerAddress,
		address retailerAddress,
		uint32 productIndex,
		uint16 quantity,
		uint32 totalCost,
		uint32 totalScore
	) external onlyInventoryManager {
		User memory buyer = userManager.getUser(buyerAddress);
		Retailer memory retailer = userManager.getRetailer(retailerAddress);
		Product memory product = inventoryManagement.getProduct(
			retailerAddress,
			productIndex
		);

		Transaction memory transaction = Transaction(
			buyer,
			retailer,
			product,
			quantity,
			totalCost,
			totalScore,
			block.timestamp
		);

		transactions.push(transaction);
		userTransactions[buyerAddress].push(transactions.length - 1);
		retailerTransactions[retailerAddress].push(transactions.length - 1);
	}

	/**
	 * @dev Retrieves a specific transaction by index
	 * @param index Index of the transaction in the array
	 * @return Transaction The transaction at the specified index
	 */
	function getTransaction(
		uint32 index
	) external view returns (Transaction memory) {
		return transactions[index];
	}

	/**
	 * @dev Retrieves all transactions for a specific user
	 * @param userAddress Address of the user
	 * @return Transaction[] Array of all transactions by the user
	 */
	function getUserTransactions(
		address userAddress
	) external view returns (Transaction[] memory) {
		uint[] memory userTransactionIndexes = userTransactions[userAddress];
		Transaction[] memory userTransactionsArray = new Transaction[](
			userTransactionIndexes.length
		);

		for (uint32 i = 0; i < userTransactionIndexes.length; i++) {
			userTransactionsArray[i] = transactions[userTransactionIndexes[i]];
		}

		return userTransactionsArray;
	}

	/**
	 * @dev Retrieves all transactions for a specific retailer
	 * @param retailerAddress Address of the retailer
	 * @return Transaction[] Array of all transactions involving the retailer
	 */
	function getRetailerTransactions(
		address retailerAddress
	) external view returns (Transaction[] memory) {
		uint[] memory retailerTransactionIndexes = retailerTransactions[
			retailerAddress
		];
		Transaction[] memory retailerTransactionsArray = new Transaction[](
			retailerTransactionIndexes.length
		);

		for (uint32 i = 0; i < retailerTransactionIndexes.length; i++) {
			retailerTransactionsArray[i] = transactions[
				retailerTransactionIndexes[i]
			];
		}

		return retailerTransactionsArray;
	}
}
