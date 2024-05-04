//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

struct User {
	string name;
	string ipfsHash;
	address walletAddress;
	string walletId;
}

struct Retailer {
	string name;
	string ipfsHash;
	string companyName;
	string cnpj;
	address walletAddress;
	string walletId;
}

contract UserManager {
	mapping(address => User) public users;
	mapping(address => Retailer) public retailers;

	function createUser(
		string memory _name,
		string memory _ipfsHash,
		string memory _walletId
	) public {
		users[msg.sender] = User(_name, _ipfsHash, msg.sender, _walletId);
	}

	function createRetailer(
		string memory _name,
		string memory _ipfsHash,
		string memory _companyName,
		string memory _cnpj,
		string memory _walletId
	) public {
		retailers[msg.sender] = Retailer(
			_name,
			_ipfsHash,
			_companyName,
			_cnpj,
			msg.sender,
			_walletId
		);
	}

	function getUser(address _walletAddress) public view returns (User memory) {
		return users[_walletAddress];
	}

	function getRetailer(
		address _walletAddress
	) public view returns (Retailer memory) {
		return retailers[_walletAddress];
	}

	function isRetailer(address _walletAddress) public view returns (bool) {
		return retailers[_walletAddress].walletAddress == _walletAddress;
	}

	function isUser(address _walletAddress) public view returns (bool) {
		return users[_walletAddress].walletAddress == _walletAddress;
	}
}
