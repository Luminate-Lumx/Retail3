// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Tether.sol";

/**
 * @title RetailerWallet
 * @dev Manages the wallet functionalities for a retailer, allowing them to
 * withdraw and receive ERC20 tokens.
 */
contract RetailerWallet {
	// Public state variable to store the owner of the wallet. The owner is
	// the only entity that can perform certain actions like withdrawing tokens.
	address public owner;

	// Interface variable for interacting with ERC20 tokens.
	IERC20 public paymentToken;

	/**
	 * @dev Constructor that sets the owner and token address upon deployment.
	 * @param _owner The address of the owner of this wallet.
	 * @param _token The address of the ERC20 token that this wallet will manage.
	 */
	constructor(address _owner, address _token) {
		owner = _owner; // Set the owner of the wallet
		paymentToken = IERC20(_token); // Set the ERC20 token to be used by this wallet
	}

	/**
	 * @dev Allows the owner to withdraw tokens to a specified address.
	 * @param to The address to which the tokens will be sent.
	 * @param amount The amount of tokens to send.
	 */
	function withdrawTokens(address to, uint256 amount) public {
		require(msg.sender == owner, "Only owner can withdraw tokens");

		require(paymentToken.transfer(to, amount), "Transfer failed");
	}

	/**
	 * @dev Receives tokens from a specified address. This can be used to fund
	 * the wallet.
	 * @param from The address from which tokens will be pulled.
	 * @param to The address to which the tokens will be sent (should be this wallet).
	 * @param amount The amount of tokens to be transferred.
	 */
	function receiveTokens(address from, address to, uint256 amount) public {
		require(paymentToken.transferFrom(from, to, amount), "Transfer failed");
	}

	/**
	 * @dev Returns the balance of ERC20 tokens held by this wallet.
	 * @return The balance of tokens.
	 */
	function balance() public view returns (uint256) {
		return paymentToken.balanceOf(address(this));
	}
}
