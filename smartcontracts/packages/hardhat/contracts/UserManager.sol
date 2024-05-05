// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

enum EntityType {
	User,
	Retailer
}

struct Entity {
	string name;
	string email;
	string ipfsHash;
	address wallet;
	EntityType entityType;
	string walletId;
	string additionalInfo;
}

contract UserManager {
	mapping(address => Entity) public entities;
	mapping(string => address) public emailToWallet;

	address[] public entitiesList;

	IERC20 public paymentToken;

	event EntityCreated(address indexed entityAddress, EntityType entityType);
	event EntityUpdated(
		address indexed entityAddress,
		string indexed property,
		string newValue
	);

	constructor(address paymentTokenAddress) {
		paymentToken = IERC20(paymentTokenAddress);
	}

	modifier isUniqueEntity() {
		require(
			entities[msg.sender].wallet == address(0),
			"Entity already registered"
		);
		_;
	}

	modifier isUniqueEmail(string memory email) {
		require(emailToWallet[email] == address(0), "Email already exists");
		_;
	}

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

		paymentToken.transfer(msg.sender, 10000 * 10 ** 18);

		emit EntityCreated(msg.sender, entityType);
	}

	function createUser(
		string memory name,
		string memory email,
		string memory ipfsHash,
		string memory walletId
	) public {
		registerEntity(name, email, ipfsHash, EntityType.User, walletId, "");
	}

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

	function getEntity(
		address walletAddress
	) public view returns (Entity memory) {
		return entities[walletAddress];
	}

	function isRetailer(address walletAddress) public view returns (bool) {
		return entities[walletAddress].entityType == EntityType.Retailer;
	}

	function isUser(address walletAddress) public view returns (bool) {
		return entities[walletAddress].entityType == EntityType.User;
	}

	function getEntitiesList() public view returns (address[] memory) {
		return entitiesList;
	}

	function getWalletByEmail(
		string memory email
	) public view returns (address) {
		return emailToWallet[email];
	}
}
