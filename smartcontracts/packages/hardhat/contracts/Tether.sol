// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract Tether is ERC20, ERC20Permit {
	constructor() ERC20("Tether", "USDT") ERC20Permit("Tether") {
		_mint(msg.sender, 1_000_000 * 10 ** decimals()); // 1 million of supply
	}
}
