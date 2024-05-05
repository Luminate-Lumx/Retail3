// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title User structure
 * @dev Stores basic user information within the system
 */
struct User {
	string name; // Name of the user
	string email; // Email address of the user
	string ipfsHash; // IPFS hash for user-related data
	string walletId; // Identifier for user's wallet
}

/**
 * @title Retailer structure
 * @dev Stores detailed retailer information
 */
struct Retailer {
	string name; // Name of the retailer
	string email; // Email address of the retailer
	string ipfsHash; // IPFS hash for retailer-related data
	string companyName; // Official company name
	string cnpj; // CNPJ (tax identification number in Brazil)
	string walletId; // Identifier for retailer's wallet
}

/**
 * @title UserManager
 * @dev Contract for managing users and retailers, handling their registration and information retrieval
 */
contract UserManager {
	// Maps an address to a User, storing user information
	mapping(address => User) public users;
	// Maps an address to a Retailer, storing retailer information
	mapping(address => Retailer) public retailers;

	// Users address list
	address[] public usersList;
	// Retailers address list
	address[] public retailersList;

	// ERC20 token for handling rewards and payments
	IERC20 public paymentToken;

	// Events to emit on various operations
	event UserCreated(address userAddress);
	event RetailerCreated(address retailerAddress);

	/**
	 * @dev Constructor to initialize the Loyalty Rewards contract
	 * @param paymentTokenAddress ERC20 token address for handling rewards and payments
	 */
	constructor(address paymentTokenAddress) {
		paymentToken = IERC20(paymentTokenAddress);
	}

	/**
	 * @dev Registers a new user with their details
	 * @param name Name of the user
	 * @param ipfsHash IPFS hash containing the user's additional data
	 * @param walletId Unique identifier for the user's wallet
	 */
	function createUser(
		string memory name,
		string memory email,
		string memory ipfsHash,
		string memory walletId
	) public {
		users[msg.sender] = User(name, email, ipfsHash, walletId);

		usersList.push(msg.sender);

		// Transfer 1000 tokens to the user
		paymentToken.transfer(msg.sender, 1000);

		emit UserCreated(msg.sender);
	}

	/**
	 * @dev Registers a new retailer with their detailed information
	 * @param name Name of the retailer
	 * @param ipfsHash IPFS hash containing the retailer's additional data
	 * @param companyName Official name of the company
	 * @param cnpj CNPJ number (Brazilian tax identification number)
	 * @param walletId Unique identifier for the retailer's wallet
	 */
	function createRetailer(
		string memory name,
		string memory email,
		string memory ipfsHash,
		string memory companyName,
		string memory cnpj,
		string memory walletId
	) public {
		retailers[msg.sender] = Retailer(
			name,
			email,
			ipfsHash,
			companyName,
			cnpj,
			walletId
		);

		retailersList.push(msg.sender);

		// Transfer 1000 tokens to the retailer
		paymentToken.transfer(msg.sender, 1000);

		emit RetailerCreated(msg.sender);
	}

	/**
	 * @dev Retrieves user information by wallet address
	 * @param walletAddress Address of the user's wallet
	 * @return User User's stored data
	 */
	function getUser(address walletAddress) public view returns (User memory) {
		return users[walletAddress];
	}

	/**
	 * @dev Retrieves retailer information by wallet address
	 * @param walletAddress Address of the retailer's wallet
	 * @return Retailer Retailer's stored data
	 */
	function getRetailer(
		address walletAddress
	) public view returns (Retailer memory) {
		return retailers[walletAddress];
	}

	/**
	 * @dev Checks if a given address belongs to a registered retailer
	 * @param walletAddress Address to check
	 * @return bool True if the address belongs to a registered retailer
	 */
	function isRetailer(address walletAddress) public view returns (bool) {
		return bytes(retailers[walletAddress].walletId).length != 0;
	}

	/**
	 * @dev Checks if a given address belongs to a registered user
	 * @param walletAddress Address to check
	 * @return bool True if the address belongs to a registered user
	 */
	function isUser(address walletAddress) public view returns (bool) {
		return bytes(users[walletAddress].walletId).length != 0;
	}

	/**
	 * @dev Retrieves the list of registered users
	 * @return address[] List of registered users
	 */
	function getUsersList() public view returns (address[] memory) {
		return usersList;
	}

	/**
	 * @dev Retrieves the list of registered retailers
	 * @return address[] List of registered retailers
	 */
	function getRetailersList() public view returns (address[] memory) {
		return retailersList;
	}
}
