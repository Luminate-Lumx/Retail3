---
sidebar_position: 2
title: MVP Deploy
---

We have deployed the MVP on the following services:

-   Frontend: [Vercel](https://vercel.com/) 🌐
-   Contracts: [Sepolia Sidechain](https://chainlist.org/chain/11155111), with the ABI's and addresses on [IPFS](https://ipfs.tech/) 🔗

## Frontend 💻

The frontend of the MVP is deployed on Vercel, and you can access it by visiting [retail3.vercel.app](https://retail3.vercel.app/). The frontend has a CD pipeline that deploys changes on the `main` branch automatically. The embedded frontend is shown below:

<iframe src="https://retail3.vercel.app/" width="100%" height="600" frameborder="0" allowfullscreen></iframe>


## Contracts 📄

Here are the current deployed contracts on the `iExec Sidechain`, with the ABI's and addresses on IPFS. You can find the ABI's and the addresses of the [project contracts](https://github.com/Luminate-Lumx/Retail3/tree/main/smartcontracts/packages/hardhat/contracts) by getting the `address` and `abi` properties of the deployed contracts:

-   [UserRegistry](https://gateway.pinata.cloud/ipfs/QmTfK9PZXJkDXqCmT6rwT7o268jjpwtUkJr7aCFuuCQkgk)
-   [EventManager](https://gateway.pinata.cloud/ipfs/QmP5GCxh9vJHQtQ6gt1nDziXJNtRSgmfjsYZyDtPmacVqo)
-   [CheckInManager](https://gateway.pinata.cloud/ipfs/QmSJKQ1K1Rikxe3m18cC2dWed1sBaxwnwuKbGZptxcQnbB)
