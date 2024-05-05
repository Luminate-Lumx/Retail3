// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title IERC20
 * @notice Interface for the ERC20 standard as defined in the EIP.
 * @dev Defines the standard functions for ERC20 tokens, including balance, allowance, transfer functionalities, and associated events.
 */
interface IERC20 {
	function totalSupply() external view returns (uint256);
	function balanceOf(address account) external view returns (uint256);
	function transfer(
		address recipient,
		uint256 amount
	) external returns (bool);
	function allowance(
		address owner,
		address spender
	) external view returns (uint256);
	function approve(address spender, uint256 amount) external returns (bool);
	function transferFrom(
		address sender,
		address recipient,
		uint256 amount
	) external returns (bool);

	event Transfer(address indexed from, address indexed to, uint256 value);
	event Approval(
		address indexed owner,
		address indexed spender,
		uint256 value
	);
	event Burn(address indexed burner, uint256 value);
}

/**
 * @title Tether
 * @notice Simulates the Tether USD (USDT) token with ERC20 functionalities.
 * @dev This contract implements the IERC20 interface and adds additional functionalities like token burning.
 * It is initialized with a fixed supply of tokens credited to the owner's address.
 */
contract Tether is IERC20 {
	string public name = "Tether";
	string public symbol = "USDT";
	uint8 public decimals = 18;
	uint256 private _totalSupply = 1_000_000_000 * 10 ** uint256(decimals);
	address private _owner;
	mapping(address => uint256) private _balances;
	mapping(address => mapping(address => uint256)) private _allowances;

	/**
	 * @notice Constructs the Tether contract and assigns initial total supply to the owner.
	 * @dev Sets the token name, symbol, decimals, and mints the total supply to the deployer.
	 */
	constructor() {
		_owner = msg.sender;
		_balances[_owner] = _totalSupply;
		emit Transfer(address(0), _owner, _totalSupply);
	}

	modifier onlyOwner() {
		require(msg.sender == _owner, "Only the owner can call this function");
		_;
	}

	function totalSupply() external view override returns (uint256) {
		return _totalSupply;
	}

	function balanceOf(
		address account
	) external view override returns (uint256) {
		return _balances[account];
	}

	function transfer(
		address recipient,
		uint256 amount
	) external override returns (bool) {
		require(recipient != address(0), "Invalid recipient");
		require(_balances[msg.sender] >= amount, "Insufficient balance");

		_balances[msg.sender] -= amount;
		_balances[recipient] += amount;
		emit Transfer(msg.sender, recipient, amount);
		return true;
	}

	function allowance(
		address owner,
		address spender
	) external view override returns (uint256) {
		return _allowances[owner][spender];
	}

	function approve(
		address spender,
		uint256 amount
	) external override returns (bool) {
		_allowances[msg.sender][spender] = amount;
		emit Approval(msg.sender, spender, amount);
		return true;
	}

	function transferFrom(
		address sender,
		address recipient,
		uint256 amount
	) external override returns (bool) {
		require(sender != address(0), "Invalid sender");
		require(recipient != address(0), "Invalid recipient");
		require(_balances[sender] >= amount, "Insufficient balance");
		require(
			_allowances[sender][msg.sender] >= amount,
			"Allowance exceeded"
		);

		_balances[sender] -= amount;
		_balances[recipient] += amount;
		_allowances[sender][msg.sender] -= amount;
		emit Transfer(sender, recipient, amount);
		return true;
	}

	/**
	 * @notice Burns a specific amount of tokens from the caller's account, reducing the total supply.
	 * @dev Removes tokens from the circulating supply by reducing the caller's balance and the total supply count.
	 * Emits a Burn event alongside a Transfer event to the zero address.
	 * @param amount The amount of tokens to be burned.
	 */
	function burn(uint256 amount) external {
		require(_balances[msg.sender] >= amount, "Insufficient balance");
		_balances[msg.sender] -= amount;
		_totalSupply -= amount;
		emit Transfer(msg.sender, address(0), amount);
		emit Burn(msg.sender, amount);
	}
}
