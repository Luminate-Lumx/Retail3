// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RetailerWallet {
	address public owner;
	IERC20 public paymentToken;

	constructor(address _owner, address _token) {
		owner = _owner;
		paymentToken = IERC20(_token);
	}

	function withdrawTokens(address to, uint256 amount) public {
		require(msg.sender == owner, "Only owner can withdraw tokens");
		require(paymentToken.transfer(to, amount), "Transfer failed");
	}

	function receiveTokens(address from, address to, uint256 amount) public {
		require(paymentToken.transferFrom(from, to, amount), "Transfer failed");
	}

	function balance() public view returns (uint256) {
		return paymentToken.balanceOf(address(this));
	}
}
