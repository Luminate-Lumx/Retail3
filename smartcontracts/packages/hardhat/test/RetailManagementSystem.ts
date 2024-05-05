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

  describe("Product Lifecycle", function () {
    it("Should allow updating a product details by the retailer", async function () {
      // Assuming the product at index 0 is already added by addr2
      await inventoryManagement
        .connect(addr2)
        .updateProduct(0, "Updated Product One", ["Electronics"], ethers.parseEther("1100"), 100, 20);
      const updatedProduct = await inventoryManagement.getProduct(addr2.address, 0);
      expect(updatedProduct.name).to.equal("Updated Product One");
      expect(updatedProduct.price).to.equal(ethers.parseEther("1100"));
      expect(updatedProduct.score).to.equal(20);
    });

    it("Should allow a retailer to remove a product from inventory", async function () {
      const initialProductCount = (await inventoryManagement.getProducts(addr2.address)).length;
      await inventoryManagement.connect(addr2).removeProduct(addr2.address, 0);
      const finalProductCount = (await inventoryManagement.getProducts(addr2.address)).filter(
        p => p.code !== BigInt(0) && p.removed === false,
      ).length;
      expect(finalProductCount).to.be.equal(initialProductCount - 1);
    });

    it("Should revert if a non-retailer tries to add a product", async function () {
      await expect(
        inventoryManagement
          .connect(addr3)
          .addProduct(2, "ipfs://hash2", "Product Two", ["Clothing"], ethers.parseEther("500"), 30, 5),
      ).to.be.revertedWith("Only retailers can call this function");
    });
  });

  describe("Handling Buying Edge Cases", function () {
    it("Should revert if trying to buy more products than available in stock", async function () {
      await inventoryManagement
        .connect(addr2)
        .addProduct(1, "ipfs://hash", "Product One", ["Electronics"], ethers.parseEther("1000"), 1, 10);
      await expect(inventoryManagement.connect(addr3).buyProduct(addr2.address, 1, 50)).to.be.revertedWith(
        "Not enough stock",
      );
    });

    it("Should revert if unauthorized address tries to update product details", async function () {
      await expect(
        inventoryManagement
          .connect(addr1)
          .updateProduct(0, "Illegally Updated Product One", ["Electronics"], ethers.parseEther("2000"), 50, 15),
      ).to.be.revertedWith("Only retailers can call this function");
    });

    it("Should revert if unauthorized address tries to remove a product", async function () {
      await expect(inventoryManagement.connect(addr1).removeProduct(addr2.address, 1)).to.be.revertedWith(
        "Only retailers can call this function",
      );
    });

    it("Should revert if trying to buy a product with insufficient balance", async function () {
      await token.connect(addr3).approve(inventoryManagement.target, ethers.parseEther("100000"));
      await inventoryManagement
        .connect(addr2)
        .updateProduct(1, "Product One", ["Electronics"], ethers.parseEther("1000"), 100, 10);
      await expect(inventoryManagement.connect(addr3).buyProduct(addr2.address, 1, 100)).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance",
      );
    });
  });
  describe("Security and Permissions", function () {
    it("Should revert if unauthorized user tries to set authorized contract in LoyaltyRewards", async function () {
      await expect(loyaltyRewards.connect(addr2).setAuthorizedContract(addr2.address)).to.be.revertedWith(
        "Unauthorized: caller is not the authorized contract",
      );
    });

    it("Should ensure only the owner can update Inventory Management contract in Transaction Manager", async function () {
      await expect(transactionManager.connect(addr2).setInventoryManagement(addr1.address)).to.be.revertedWith(
        "Only owner can call this function",
      );
    });

    it("Should prevent unauthorized users from removing products", async function () {
      await expect(inventoryManagement.connect(addr3).removeProduct(addr2.address, 0)).to.be.revertedWith(
        "Only retailers can call this function",
      );
    });
  });
});
