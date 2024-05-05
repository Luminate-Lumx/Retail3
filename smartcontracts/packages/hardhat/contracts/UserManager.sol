// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title EntityType
 * @notice Enumerates types of entities managed in the UserManager contract.
 */
enum EntityType {
	User,
	Retailer
}

/**
 * @title Entity
 * @notice Represents an entity (either a user or a retailer) in the system.
 * @dev Stores details like name, email, and IPFS hash for extended data.
 */
struct Entity {
	string name;
	string email;
	string ipfsHash;
	address wallet;
	EntityType entityType;
	string walletId;
	string additionalInfo;
}

/**
 * @title UserManager
 * @notice Manages registration and updates of user and retailer entities.
 * @dev This contract handles the creation, updating, and querying of user and retailer entities,
 * leveraging mappings for efficient data retrieval.
 */
contract UserManager {
	mapping(address => Entity) public entities; // Mapping from wallet address to entity details
	mapping(string => address) public emailToWallet; // Mapping from email to wallet address for quick lookup

	address[] public entitiesList; // Dynamic array of entity addresses

	IERC20 public paymentToken; // ERC20 token used for transactions within the system

	event EntityCreated(address indexed entityAddress, EntityType entityType);
	event EntityUpdated(
		address indexed entityAddress,
		string indexed property,
		string newValue
	);

	constructor(address paymentTokenAddress) {
		paymentToken = IERC20(paymentTokenAddress);
	}

	/**
	 * @notice Ensures that the entity is not already registered.
	 */
	modifier isUniqueEntity() {
		require(
			entities[msg.sender].wallet == address(0),
			"Entity already registered"
		);
		_;
	}

	/**
	 * @notice Ensures the email is not already in use by another entity.
	 */
	modifier isUniqueEmail(string memory email) {
		require(emailToWallet[email] == address(0), "Email already exists");
		_;
	}

	/**
	 * @notice Registers an entity with the provided details.
	 * @dev Creates a new entity or updates an existing one, assigning it an initial balance of tokens.
	 * @param name Name of the entity
	 * @param email Email address of the entity
	 * @param ipfsHash IPFS hash for extended data storage
	 * @param entityType Type of the entity (User or Retailer)
	 * @param walletId Unique identifier for the entity's wallet
	 * @param additionalInfo Additional information relevant to the entity
	 */
	function registerEntity(
		string memory name,
		string memory email,
		string memory ipfsHash,
		EntityType entityType,
		string memory walletId,
		string memory additionalInfo
	) public isUniqueEntity isUniqueEmail(email) {
		entities[msg.sender] = Entity(
			name,
			email,
			ipfsHash,
			msg.sender,
			entityType,
			walletId,
			additionalInfo
		);
		entitiesList.push(msg.sender);
		emailToWallet[email] = msg.sender;

		paymentToken.transfer(msg.sender, 100 * 10 ** 18); // Initially allocating tokens

		emit EntityCreated(msg.sender, entityType);
	}

	/**
	 * @notice Simplified registration process for users.
	 * @param name Name of the user
	 * @param email Email address of the user
	 * @param ipfsHash IPFS hash for user data
	 * @param walletId Wallet identifier for the user
	 */
	function createUser(
		string memory name,
		string memory email,
		string memory ipfsHash,
		string memory walletId
	) public {
		registerEntity(name, email, ipfsHash, EntityType.User, walletId, "");
	}

	/**
	 * @notice Simplified registration process for retailers.
	 * @param name Name of the retailer
	 * @param email Email address of the retailer
	 * @param ipfsHash IPFS hash for retailer data
	 * @param walletId Wallet identifier for the retailer
	 * @param additionalInfo Additional information for the retailer
	 */
	function createRetailer(
		string memory name,
		string memory email,
		string memory ipfsHash,
		string memory walletId,
		string memory additionalInfo
	) public {
		registerEntity(
			name,
			email,
			ipfsHash,
			EntityType.Retailer,
			walletId,
			additionalInfo
		);
	}

	/**
	 * @notice Updates an entity's specific property.
	 * @dev Allows entities to update their information post-registration.
	 * @param property The property to update ("name", "email", "ipfsHash", "additionalInfo")
	 * @param newValue The new value for the specified property
	 */
	function updateEntity(
		string memory property,
		string memory newValue
	) public {
		require(
			entities[msg.sender].wallet != address(0),
			"Entity not registered"
		);

		if (
			keccak256(abi.encodePacked(property)) ==
			keccak256(abi.encodePacked("name"))
		) {
			entities[msg.sender].name = newValue;
		} else if (
			keccak256(abi.encodePacked(property)) ==
			keccak256(abi.encodePacked("email"))
		) {
			entities[msg.sender].email = newValue;
		} else if (
			keccak256(abi.encodePacked(property)) ==
			keccak256(abi.encodePacked("ipfsHash"))
		) {
			entities[msg.sender].ipfsHash = newValue;
		} else if (
			keccak256(abi.encodePacked(property)) ==
			keccak256(abi.encodePacked("additionalInfo"))
		) {
			entities[msg.sender].additionalInfo = newValue;
		} else {
			revert("Invalid property");
		}

		emit EntityUpdated(msg.sender, property, newValue);
	}

	/**
	 * @notice Retrieves detailed information about an entity.
	 * @param walletAddress The wallet address of the entity.
	 * @return Entity The complete entity structure with all details.
	 */
	function getEntity(
		address walletAddress
	) public view returns (Entity memory) {
		return entities[walletAddress];
	}

	/**
	 * @notice Checks if an address belongs to a retailer.
	 * @param walletAddress The wallet address to check.
	 * @return bool True if the address belongs to a retailer.
	 */
	function isRetailer(address walletAddress) public view returns (bool) {
		return entities[walletAddress].entityType == EntityType.Retailer;
	}

	/**
	 * @notice Checks if an address belongs to a user.
	 * @param walletAddress The wallet address to check.
	 * @return bool True if the address belongs to a user.
	 */
	function isUser(address walletAddress) public view returns (bool) {
		return entities[walletAddress].entityType == EntityType.User;
	}

	/**
	 * @notice Retrieves a list of all registered entity addresses.
	 * @return address[] A list of all entity addresses.
	 */
	function getEntitiesList() public view returns (address[] memory) {
		return entitiesList;
	}

	/**
	 * @notice Retrieves the wallet address associated with a given email.
	 * @param email The email to search for.
	 * @return address The wallet address associated with the email.
	 */
	function getWalletByEmail(
		string memory email
	) public view returns (address) {
		return emailToWallet[email];
	}
}
