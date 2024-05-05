// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/**
 * @title Tether
 * @notice Simulates the Tether stablecoin functionality with ERC20 compatibility and gasless transactions feature using ERC20Permit.
 * @dev This contract is a simplified representation of the Tether USD (USDT) token, implementing ERC20 standard with
 * the addition of EIP-2612 for permit (gasless transactions). This contract mints an initial supply to the deployer's
 * address and supports off-chain approvals.
 */
contract Tether is ERC20, ERC20Permit {
	/**
	 * @notice Constructor to create the Tether token
	 * @dev Initializes the ERC20 token with a name and symbol, and also initializes the ERC20Permit extension with the same token name.
	 * 10,000 tokens are minted at deployment and assigned to the deployer address. The number of tokens minted uses the `decimals` setting
	 * from ERC20 standard which is by default set to 18, meaning the total supply is actually 10,000 * 10^18 in smallest unit.
	 */
	constructor() ERC20("Tether", "USDT") ERC20Permit("Tether") {
		_mint(msg.sender, 10_000 * 10 ** decimals());
	}
}
