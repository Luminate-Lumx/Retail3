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
