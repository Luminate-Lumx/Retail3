// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LoyaltyRewards {
	mapping(address => uint) public scores;

	address private authorizedContract;
	uint public redemptionPool;
	uint public scorePool;

	IERC20 public paymentToken;

	constructor(address _authorizedContract, address _paymentTokenAddress) {
		paymentToken = IERC20(_paymentTokenAddress);
		authorizedContract = _authorizedContract;
	}

	event RedeemScore(address user, uint score, uint redeemTokens);
	event ContributeToPoll(uint amount);
	event AddScore(address user, uint score);
	event TransferScore(address from, address to, uint score);

	modifier onlyAuthorized() {
		require(
			msg.sender == authorizedContract,
			"Unauthorized: caller is not the authorized contract"
		);
		_;
	}

	function addScore(address user, uint score) public onlyAuthorized {
		scores[user] += score;
		scorePool += score;

		emit AddScore(user, score);
	}

	function redeemScore(address user, uint score) public onlyAuthorized {
		uint redeemTokens = (redemptionPool / scorePool) * score;

		require(
			redeemTokens <= redemptionPool,
			"Redemption pool does not have enough tokens"
		);

		require(scores[user] >= score, "User does not have enough score");

		scores[user] -= score;
		redemptionPool -= redeemTokens;
		scorePool -= score;

		paymentToken.transfer(user, redeemTokens);

		emit RedeemScore(user, score, redeemTokens);
	}

	function transferScore(
		address from,
		address to,
		uint score
	) public onlyAuthorized {
		require(scores[from] >= score, "User does not have enough score");

		scores[from] -= score;
		scores[to] += score;

		emit TransferScore(from, to, score);
	}

	function contributeToPoll(uint amount) public onlyAuthorized {
		redemptionPool += amount;

		emit ContributeToPoll(amount);
	}
}
