// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./InventoryManagement.sol";
import "./UserManager.sol";

/**
 * @title Transaction structure
 * @notice Holds data for a single retail transaction.
 * @dev This struct encapsulates all the details needed for recording transactions, including associated scores and costs.
 */
struct Transaction {
	address buyer; // Address of the buyer
	address retailer; // Address of the retailer
	uint32 productIndex; // Index of the purchased product in the inventory
	uint16 quantity; // Quantity of the product purchased
	uint256 totalPrice; // Total price paid
	uint32 totalScore; // Loyalty score earned from the transaction
	uint256 timestamp; // Timestamp when the transaction was recorded
}

/**
 * @title Transaction Manager
 * @notice Manages recording and retrieving transactions in a retail environment
 * @dev This contract allows for recording of retail transactions, linking products, buyers, and retailers with financial and loyalty data.
 */
contract TransactionManager {
	Transaction[] public transactions; // Dynamic array of all transactions
	mapping(address => uint[]) public userTransactions; // Mapping from user addresses to list of transaction indices
	mapping(address => uint[]) public retailerTransactions; // Mapping from retailer addresses to list of transaction indices

	InventoryManagement public inventoryManagement; // Instance of InventoryManagement contract
	UserManager public userManager; // Instance of UserManager contract

	address public owner; // Owner of the contract

	/**
	 * @notice Initializes the contract with the address of the UserManager contract.
	 * @dev Sets the owner to the message sender and initializes the UserManager contract.
	 * @param userManagerAddress Address of the UserManager contract.
	 */
	constructor(address userManagerAddress) {
		owner = msg.sender;
		userManager = UserManager(userManagerAddress);
	}

	// Modifiers
	/**
	 * @notice Ensures the caller is the InventoryManagement contract.
	 * @dev Modifier to restrict function access to only the InventoryManagement contract.
	 */
	modifier onlyInventoryManager() {
		require(
			msg.sender == address(inventoryManagement),
			"Only InventoryManager can call this function"
		);
		_;
	}

	/**
	 * @notice Ensures the caller is the owner of the contract.
	 * @dev Modifier to restrict function access to only the owner of the contract.
	 */
	modifier onlyOwner() {
		require(msg.sender == owner, "Only owner can call this function");
		_;
	}

	// Functions
	/**
	 * @notice Sets the InventoryManagement contract address.
	 * @dev Can only be called by the contract owner.
	 * @param inventoryManagementAddress Address of the InventoryManagement contract to be linked.
	 */
	function setInventoryManagement(
		address inventoryManagementAddress
	) external onlyOwner {
		inventoryManagement = InventoryManagement(inventoryManagementAddress);
	}

	/**
	 * @notice Records a transaction in the system.
	 * @dev Stores transaction details and updates mappings for user and retailer transaction lists. Can only be called by InventoryManagement.
	 * @param buyerAddress Address of the buyer.
	 * @param retailerAddress Address of the retailer.
	 * @param productIndex Index of the product being purchased.
	 * @param quantity Quantity of the product being purchased.
	 * @param totalCost Total cost of the transaction.
	 * @param totalScore Total loyalty score associated with the transaction.
	 */
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

	/**
	 * @notice Retrieves a transaction by its index.
	 * @param index Index of the transaction in the array.
	 * @return Transaction data structure containing all transaction details.
	 */
	function getTransaction(
		uint32 index
	) external view returns (Transaction memory) {
		return transactions[index];
	}

	/**
	 * @notice Retrieves all transactions associated with a specific user.
	 * @param userAddress Address of the user.
	 * @return An array of transactions made by the user.
	 */
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

	/**
	 * @notice Retrieves all transactions associated with a specific retailer.
	 * @param retailerAddress Address of the retailer.
	 * @return An array of transactions involving the retailer.
	 */
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
