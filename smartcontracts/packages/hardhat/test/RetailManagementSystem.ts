import { expect } from "chai";
import { ethers } from "hardhat";
import { InventoryManagement, LoyaltyRewards, TransactionManager, UserManager, Tether } from "../typechain-types";

describe("Retail Management System", function () {
  let inventoryManagement: InventoryManagement;
  let loyaltyRewards: LoyaltyRewards;
  let transactionManager: TransactionManager;
  let userManager: UserManager;
  let token: Tether;
  let addr1: any, addr2: any, addr3: any;

  before(async () => {
    [addr1, addr2, addr3] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Tether");
    token = await Token.deploy();
    await token.waitForDeployment();

    const UserManager = await ethers.getContractFactory("UserManager");
    userManager = await UserManager.deploy(token.target);
    await userManager.waitForDeployment();

    token.connect(addr1).transfer(userManager.target, ethers.parseEther("100000"));

    const LoyaltyRewards = await ethers.getContractFactory("LoyaltyRewards");
    loyaltyRewards = await LoyaltyRewards.deploy(token.target);
    await loyaltyRewards.waitForDeployment();

    const TransactionManager = await ethers.getContractFactory("TransactionManager");
    transactionManager = await TransactionManager.deploy(userManager.target);
    await transactionManager.waitForDeployment();

    const InventoryManagement = await ethers.getContractFactory("InventoryManagement");
    inventoryManagement = await InventoryManagement.deploy(
      userManager.target,
      token.target,
      loyaltyRewards.target,
      transactionManager.target,
    );

    await loyaltyRewards.connect(addr1).setAuthorizedContract(inventoryManagement.target);
    await transactionManager.connect(addr1).setInventoryManagement(inventoryManagement.target);

    await userManager
      .connect(addr2)
      .createRetailer("Retailer One", "retailer@one.com", "hash1", "Company One", "1234567890", "wallet1");

    await userManager.connect(addr3).createUser("User Two", "user@two.com", "hash2", "wallet2");
  });

  describe("Product Management", function () {
    it("Allows a retailer to add a product", async function () {
      await expect(
        inventoryManagement
          .connect(addr2)
          .addProduct(1, "ipfs://hash", "Product One", ["Electronics"], ethers.parseEther("1000"), 50, 10),
      )
        .to.emit(inventoryManagement, "ProductAdded")
        .withArgs(addr2.address, 1);

      const product = await inventoryManagement.getProduct(addr2.address, 0);
      expect(product.name).to.equal("Product One");
    });

    it("Allows a customer to buy a product", async function () {
      const initialBalance = await token.balanceOf(addr3.address);
      await token.connect(addr3).approve(inventoryManagement.target, ethers.parseEther("1000"));
      await expect(inventoryManagement.connect(addr3).buyProduct(addr2.address, 0, 1))
        .to.emit(inventoryManagement, "ProductBought")
        .withArgs(addr3.address, addr2.address, "Product One", 1);

      const updatedStock = await inventoryManagement.productStock(addr2.address, 1);
      expect(updatedStock).to.equal(49);
      expect(await token.balanceOf(addr3.address)).to.equal(initialBalance - ethers.parseEther("1000"));
    });
  });

  describe("Loyalty and Rewards", function () {
    it("Allows accumulation and redemption of loyalty points", async function () {
      const initialBalance = await token.balanceOf(addr3.address);
      await token.connect(addr3).approve(inventoryManagement.target, ethers.parseEther("2000"));
      await inventoryManagement.connect(addr3).buyProduct(addr2.address, 0, 2);

      const score = await loyaltyRewards.getScore(addr2.address, addr3.address);
      expect(score).to.equal(30);
      expect(await token.balanceOf(addr3.address)).to.equal(initialBalance - ethers.parseEther("2000"));

      const redeemTokens = await loyaltyRewards.calculateRedeemTokens(addr2.address, 30);

      await expect(loyaltyRewards.connect(addr3).redeemScore(addr2.address, 30))
        .to.emit(loyaltyRewards, "RedeemScore")
        .withArgs(addr3.address, 30, redeemTokens);

      expect(await token.balanceOf(addr3.address)).to.equal(initialBalance - ethers.parseEther("2000") + redeemTokens);
      expect(await loyaltyRewards.getScore(addr2.address, addr3.address)).to.equal(0);
    });
  });

  describe("Transaction Records", function () {
    it("Records a transaction when a product is bought", async function () {
      const transactionCountBefore = (await transactionManager.getRetailerTransactions(addr2.address)).length;
      await token.connect(addr3).approve(inventoryManagement.target, ethers.parseEther("1000"));
      await inventoryManagement.connect(addr3).buyProduct(addr2.address, 0, 1);

      const transactionCountAfter = (await transactionManager.getRetailerTransactions(addr2.address)).length;
      expect(transactionCountAfter).to.be.equal(transactionCountBefore + 1);

      const transaction = await transactionManager.getTransaction(transactionCountBefore);
      expect(transaction.totalPrice).to.equal(ethers.parseEther("1000"));
    });

    it("Allows viewing transactions by a user", async function () {
      const transactionCountBefore = (await transactionManager.getUserTransactions(addr3.address)).length;
      await token.connect(addr3).approve(inventoryManagement.target, ethers.parseEther("2000"));
      await inventoryManagement.connect(addr3).buyProduct(addr2.address, 0, 2);

      const transactionCountAfter = (await transactionManager.getUserTransactions(addr3.address)).length;
      expect(transactionCountAfter).to.be.equal(transactionCountBefore + 1);

      const transaction = await transactionManager.getTransaction(transactionCountBefore);
      expect(transaction.totalPrice).to.equal(ethers.parseEther("2000"));
    });
  });
});
