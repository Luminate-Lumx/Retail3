---
title: Prerequisites
sidebar_position: 0
---

You will learn about the prerequisites required to get started with the project, be it for development or production purposes. 🚀

## Packages 📦

Before you start, you need to have the following prerequisites:

-   Have a unix-like environment (Linux, macOS, WSL, etc). 💻
-   [Git](https://git-scm.com/) - Git is a distributed version control system. 🌐
-   [Docker / Docker compose](https://docs.docker.com/get-docker/) - Docker is a platform for building, running, and shipping applications. Docker Compose is a tool for defining and running multi-container Docker applications. 🐳
-   A Wallet with some testnet ETH to deploy the contracts. 💰
-   A project on [lumx protocol API](https://docs.lumx.io/get-started/introduction) to get the required Access Tokens. 🔑
-   An account on [Alchemy](https://www.alchemy.com/) and [Pinata](https://pinata.cloud/) to get the required API keys. 🔑

## Project 📂

You need to have the project cloned in your local machine. You can do this by running the following command in the terminal:

```bash
git clone git@github.com:Luminate-Lumx/Retail3.git
```

and then, navigate to the project's root directory:

```bash
cd Retail3
```

## Environment Variables 🔐

On the root of the project, you will find a `.env.example` file. You need to create a `.env` file and copy the content of the `.env.example` file to it. Then, you need to fill in the environment variables with the required values.

```bash title=".env"
# Web3 provider scaffold-eth
ALCHEMY_API_KEY="YOUR_ALCHEMY_API_KEY"
DEPLOYER_PRIVATE_KEY="YOUR_DEPLOY_WALLET_PRIVATE_KEY"

# IPFS
VITE_PINATA_JWT="YOUR_PINATA_JWT"

# Frontend
VITE_DEPLOY_IPFS_FOLDER_URL="YOUR_IPFS_FOLDER_URL"
VITE_LUMX_BEARER="YOUR_LUMX_BEARER"
VITE_WEB3_PROVIDER="YOUR_WEB3_HTTP_PROVIDER"
VITE_WEB3_WSS_PROVIDER="YOUR_WEB3_WSS_PROVIDER"
```

### Environment Variables Explanation

1. **ALCHEMY_API_KEY**

    - **Purpose**: Used for interacting with the Ethereum blockchain.
    - **How to Get**:
        - Create an account at [Alchemy](https://www.alchemy.com/).
        - Follow the steps to [create an Alchemy app](https://cro-docs.alchemy.com/guides/getting-started#id-1.create-an-alchemy-app).
        - Your API key will be available in the app dashboard.

2. **DEPLOYER_PRIVATE_KEY**

    - **Purpose**: The private key of the account that will deploy the contracts on the Ethereum testnet.
    - **How to Get**:
        - Use MetaMask or another Ethereum wallet.
        - Follow the instructions on [how to export an account's private key](https://support.metamask.io/vi/managing-my-wallet/secret-recovery-phrase-and-private-keys/how-to-export-an-accounts-private-key/).

3. **VITE_PINATA_JWT**

    - **Purpose**: Required for uploading images to IPFS.
    - **How to Get**:
        - Sign up at [Pinata](https://pinata.cloud/).
        - Create an API key as described [here](https://pinata.cloud/keys).
        - Get your gateway information from [Pinata gateway settings](https://app.pinata.cloud/gateway).

4. **VITE_DEPLOY_IPFS_FOLDER_URL**

    - **Purpose**: The IPFS folder URL where the contracts are deployed.
    - **How to Get**:
        - Deploy your contracts to the testnet.
        - Upload the contract artifacts to IPFS.
        - Your folder URL will be the IPFS link to these artifacts.

5. **VITE_LUMX_BEARER**

    - **Purpose**: The bearer token for the lumx API.
    - **How to Get**:
        - Create an account and a project at [lumx](https://docs.lumx.io/api-reference/v2/projects/create-a-project).
        - Obtain the bearer token as per instructions in the [lumx documentation](https://docs.lumx.io/get-started/introduction).

6. **VITE_WEB3_PROVIDER** and **VITE_WEB3_WSS_PROVIDER**
    - **Purpose**: Web3 providers used to interact with Ethereum blockchain.
    - **How to Get**:
        - Use services like [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/).
        - Create an account and set up a project to obtain these endpoints.
