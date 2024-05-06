---
sidebar_position: 2
title: MVP Deploy
---

We have deployed the MVP on the following services:

-   Frontend: [Vercel](https://vercel.com/) 🌐
-   Contracts: [Sepolia ETH](https://chainlist.org/chain/11155111), with the ABI's and addresses on [IPFS](https://ipfs.tech/) 🔗

## Frontend 💻

The frontend of the MVP is deployed on Vercel, and you can access it by visiting [retail3.vercel.app](https://retail3.vercel.app/). The frontend has a CD pipeline that deploys changes on the `main` branch automatically. The embedded frontend is shown below:

<iframe src="https://retail3.vercel.app/" width="100%" height="600" frameborder="0" allowfullscreen></iframe>

## Contracts 📄

Here are the current deployed contracts on the `Sepolia ETH`, with the ABI's and addresses on IPFS. You can find the ABI's and the addresses of the [project contracts](https://github.com/Luminate-Lumx/Retail3/tree/main/smartcontracts/packages/hardhat/contracts) by getting the `address` and `abi` properties of the deployed contracts:

You can get use the base folder of the IPFS to get the ABI's and addresses of the contracts:

-   [Deploy IPFS Main Folder](https://gateway.pinata.cloud/ipfs/QmX3B1GEdrRrnMYgRFz1hCMkkmK6UJNkBKtpKRhoUhtaGy)

or you can get the ABI's and addresses of the contracts directly:

-   [InventoryManagement](https://gateway.pinata.cloud/ipfs/QmX3B1GEdrRrnMYgRFz1hCMkkmK6UJNkBKtpKRhoUhtaGy/InventoryManagement.json)
-   [LoyaltyRewards](https://gateway.pinata.cloud/ipfs/QmX3B1GEdrRrnMYgRFz1hCMkkmK6UJNkBKtpKRhoUhtaGy/LoyaltyRewards.json)
-   [TransactionManager](https://gateway.pinata.cloud/ipfs/QmX3B1GEdrRrnMYgRFz1hCMkkmK6UJNkBKtpKRhoUhtaGy/TransactionManager.json)
-   [UserManager](https://gateway.pinata.cloud/ipfs/QmX3B1GEdrRrnMYgRFz1hCMkkmK6UJNkBKtpKRhoUhtaGy/UserManager.json)
-   [Tether](https://gateway.pinata.cloud/ipfs/QmX3B1GEdrRrnMYgRFz1hCMkkmK6UJNkBKtpKRhoUhtaGy/Tether.json)

## Latest Smart Contracts Tests Logs📜

```shell
scaffold-test-1   |
scaffold-test-1   |   Retail Management System
scaffold-test-1   |     Unique User and Retailer Registrations
scaffold-test-1   |       ✓ Should allow creating a new entities
scaffold-test-1   |       ✓ Should prevent creating a user with an already registered address
scaffold-test-1   |       ✓ Should prevent creating a retailer with an already registered address
scaffold-test-1   |       ✓ Should prevent creating a user with an already registered email
scaffold-test-1   |       ✓ Should prevent creating a retailer with an already registered email
scaffold-test-1   |     Product Management
scaffold-test-1   |       ✓ Allows a retailer to add a product
scaffold-test-1   |       ✓ Allows a customer to buy a product
scaffold-test-1   |     Loyalty and Rewards
scaffold-test-1   |       ✓ Allows accumulation and redemption of loyalty points
scaffold-test-1   |     Transaction Records
scaffold-test-1   |       ✓ Records a transaction when a product is bought
scaffold-test-1   |       ✓ Allows viewing transactions by a user
scaffold-test-1   |     Product Lifecycle
scaffold-test-1   |       ✓ Should allow updating a product details by the retailer
scaffold-test-1   |       ✓ Should allow a retailer to remove a product from inventory
scaffold-test-1   |       ✓ Should revert if a non-retailer tries to add a product
scaffold-test-1   |     Handling Buying Edge Cases
scaffold-test-1   |       ✓ Should revert if trying to buy more products than available in stock
scaffold-test-1   |       ✓ Should revert if unauthorized address tries to update product details
scaffold-test-1   |       ✓ Should revert if unauthorized address tries to remove a product
scaffold-test-1   |       ✓ Should revert if trying to buy a product with insufficient balance
scaffold-test-1   |     Security and Permissions
scaffold-test-1   |       ✓ Should revert if unauthorized user tries to set authorized contract in LoyaltyRewards
scaffold-test-1   |       ✓ Should ensure only the owner can update Inventory Management contract in Transaction Manager
scaffold-test-1   |       ✓ Should prevent unauthorized users from removing products
scaffold-test-1   |
scaffold-test-1   | ·--------------------------------------------------|---------------------------|-------------|-----------------------------·
scaffold-test-1   | |               Solc version: 0.8.0                ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 30000000 gas  │
scaffold-test-1   | ···················································|···························|·············|······························
scaffold-test-1   | |  Methods                                         ·               4 gwei/gas                ·       2920.63 eur/eth       │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  Contract             ·  Method                  ·  Min        ·  Max        ·  Avg        ·  # calls      ·  eur (avg)  │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  InventoryManagement  ·  addProduct              ·     202133  ·     236333  ·     224933  ·            3  ·       2.63  │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  InventoryManagement  ·  buyProduct              ·     296309  ·     688027  ·     463256  ·            5  ·       5.41  │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  InventoryManagement  ·  removeProduct           ·          -  ·          -  ·      41246  ·            1  ·       0.48  │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  InventoryManagement  ·  updateProduct           ·      63796  ·      69480  ·      66638  ·            2  ·       0.78  │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  LoyaltyRewards       ·  redeemScore             ·          -  ·          -  ·      52561  ·            2  ·       0.61  │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  LoyaltyRewards       ·  setAuthorizedContract   ·          -  ·          -  ·      27032  ·            1  ·       0.32  │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  Tether               ·  approve                 ·      46193  ·      46205  ·      46200  ·            5  ·       0.54  │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  Tether               ·  transfer                ·          -  ·          -  ·      51690  ·            1  ·       0.60  │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  TransactionManager   ·  setInventoryManagement  ·          -  ·          -  ·      46110  ·            1  ·       0.54  │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  UserManager          ·  createRetailer          ·          -  ·          -  ·     265593  ·            2  ·       3.10  │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  UserManager          ·  createUser              ·          -  ·          -  ·     227386  ·            2  ·       2.66  │
scaffold-test-1   | ························|··························|·············|·············|·············|···············|··············
scaffold-test-1   | |  Deployments                                     ·                                         ·  % of limit   ·             │
scaffold-test-1   | ···················································|·············|·············|·············|···············|··············
scaffold-test-1   | |  InventoryManagement                             ·          -  ·          -  ·    2058797  ·        6.9 %  ·      24.05  │
scaffold-test-1   | ···················································|·············|·············|·············|···············|··············
scaffold-test-1   | |  LoyaltyRewards                                  ·          -  ·          -  ·    1294615  ·        4.3 %  ·      15.12  │
scaffold-test-1   | ···················································|·············|·············|·············|···············|··············
scaffold-test-1   | |  Tether                                          ·          -  ·          -  ·     706386  ·        2.4 %  ·       8.25  │
scaffold-test-1   | ···················································|·············|·············|·············|···············|··············
scaffold-test-1   | |  TransactionManager                              ·          -  ·          -  ·     823945  ·        2.7 %  ·       9.63  │
scaffold-test-1   | ···················································|·············|·············|·············|···············|··············
scaffold-test-1   | |  UserManager                                     ·          -  ·          -  ·    1441566  ·        4.8 %  ·      16.84  │
scaffold-test-1   | ·--------------------------------------------------|-------------|-------------|-------------|---------------|-------------·
scaffold-test-1   |
scaffold-test-1   |   20 passing (2s)
scaffold-test-1   |
scaffold-test-1 exited with code 0
```
