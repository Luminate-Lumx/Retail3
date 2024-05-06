---
sidebar_position: 0
title: Structures
---

Here you can find the structure of the project, including the smartcontracts, frontend, docker services, and CI/CD workflow. 🏗️

## High Level Overview of user interaction 🌐

A user interaction diagram that shows the flow of the user interaction with the system. The users can be divided into two categories: **Retailers** and **Customers**. The retailers can add, update, and remove products from their inventory, while the customers can purchase products and earn loyalty points. The system also includes a **User Manager** to manage user registration and a **Retailer Wallet** to handle retailer transactions.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/VxAapve49YtBhDpfjorCyc"></iframe>

## Overview technology architecture 🏗️

<iframe style={{border:"none"}} width="800" height="450" src="https://whimsical.com/embed/7DC1JXxUmhVjZmhsnzcKsz"></iframe>

## Folders 📁

-   [smartcontracts](https://github.com/Luminate-Lumx/Retail3/tree/main/smartcontracts): Repository of [Scaffold-eth2](https://github.com/scaffold-eth/scaffold-eth-2) with the smart contracts and tests for the project. 📜
-   [client](https://github.com/Luminate-Lumx/Retail3/tree/main/client): Is the frontend of application, with [React.js](https://react.dev/) for the frontend-dom of the project with the [lumx-node package](https://github.com/Luminate-Lumx/lumx-node). 💻
-   [docs](https://github.com/Luminate-Lumx/Retail3/tree/main/docs): Documentation of the project with [docusaurus](https://docusaurus.io/). _You are here 🤓_.
-   [.github](https://github.com/Luminate-Lumx/Retail3/tree/main/.github): Github actions for the project, with the tests and autodeploy of the frontend services. 🛠️
-   `Dockerfile.* and docker-compose-*.yml`: Docker containers for the services of the project, with [docker-compose](https://docs.docker.com/compose/) for the development and test environments. 🐳

## Contracts 📄

You can find the smart contracts in the [contracts folder](https://github.com/Luminate-Lumx/Retail3/tree/main/smartcontracts/packages/hardhat/contracts) and the tests in the [test folder](https://github.com/Luminate-Lumx/Retail3/tree/main/smartcontracts/packages/hardhat/test) of the repository. The contracts are written in Solidity and are used to manage the retail ecosystem, including the inventory, loyalty rewards, transactions, and user management systems.

### **InventoryManagement** 📦

-   **Purpose**: Manages the inventory of products for retailers within a decentralized store environment.
-   **Functionality**:
    -   Allows verified retailers to add, update, and remove products in their inventory 🔄.
    -   Facilitates the purchase of products by customers, managing payments, stock updates, and loyalty score allocation 💳.
    -   Provides detailed views of products, including stock levels for individual items 📊.
-   **Key Features**:
    -   Product management (add/update/remove) 🏷️
    -   Purchase processing with loyalty rewards integration 💰
    -   Inventory and stock tracking 🔍

### **LoyaltyRewards** 🌟

-   **Purpose**: Manages the loyalty points system within a retail ecosystem, facilitating accrual, redemption, and transfers of points.
-   **Functionality**:
    -   Adds loyalty scores to user accounts when purchases are made 👥.
    -   Allows users to redeem loyalty points for tokens 🔁.
    -   Manages retailer-specific wallets for handling redeemed points 🏦.
-   **Key Features**:
    -   Point accrual and redemption 🎁
    -   Transfer of loyalty points between users ↔️
    -   Dynamic management of retailer-specific wallets for fund security 🛡️

### **TransactionManager** 📑

-   **Purpose**: Handles recording and retrieving of transaction data within the retail environment.
-   **Functionality**:
    -   Records details of each transaction including buyer, retailer, product, quantity, price, and loyalty score 📝.
    -   Allows retrieval of transactions by user or retailer, providing a comprehensive history 🕒.
-   **Key Features**:
    -   Secure transaction recording 🖋️
    -   Access to historical transaction data 📚
    -   Integration with InventoryManagement for transaction processing 🔗

### **Tether (USDT)** 💵

-   **Purpose**: Simulates the Tether USD token, an ERC20 token used within the ecosystem for payments and rewards.
-   **Functionality**:
    -   Implements standard ERC20 functionalities including transfers, allowances, and approvals 🔄.
    -   Includes a burn feature to remove tokens from circulation 🔥.
-   **Key Features**:
    -   Fixed initial token supply 🔒
    -   Token burn capability for managing total supply 🔥

### **RetailerWallet** 💼

-   **Purpose**: Manages ERC20 token transactions for retailers, specifically for handling withdrawals and receiving tokens.
-   **Functionality**:
    -   Enables retailers to withdraw tokens to any specified address 🏦.
    -   Allows the contract to receive tokens to fund the retailer’s wallet 💰.
-   **Key Features**:
    -   Secure management of retailer funds 🔐
    -   Integration with loyalty systems for redemption processes 🔄

### **UserManager** 👥

-   **Purpose**: Manages registration and updates for users and retailers, maintaining a directory of participant entities.
-   **Functionality**:
    -   Registers new users and retailers with their details and initializes their token balance 📝.
    -   Provides updates and retrieval of entity details 🔍.
    -   Manages entity type verification to distinguish between users and retailers 🆔.
-   **Key Features**:
    -   Entity registration and management 🗂️
    -   Email to wallet address mapping for quick lookups 🔎
    -   Initial token allocation to new entities 💸

## Docker 🐳

### Services 🛠️

List of all services that are in the project and their respective details.

-   **docker-compose-common.yml**

    -   Common configurations used across different Docker compositions.
    -   Services:
        -   **scaffold-build**: Sets up the environment for smart contracts, including installing dependencies.
        -   **client-build**: Prepares the client application by installing necessary packages.

-   **docker-compose-client.yml**

    -   Manages services related to the client-side application development.
    -   Services:
        -   **client-build**: Extends the `client-build` service from `docker-compose-common.yml` for consistent client setup.
        -   **client-vite**: Manages the client development server using Vite, serving the application on port 5173 and watching for file changes in the client directory.

-   **docker-compose-smartcontracts.yml**

    -   Focuses on smart contracts compilation, deployment, and the associated frontend.
    -   Services:
        -   **scaffold-build**: Inherits settings from `docker-compose-common.yml` for building smart contracts.
        -   **scaffold-deploy**: Handles deployment of smart contracts.
        -   **scaffold-next**: Runs a Next.js server for the frontend on port 3000, depending on successful deployment of contracts.

-   **docker-compose-test.yml**

    -   Dedicated to running tests for the smart contracts.
    -   Services:
        -   **scaffold-build**: Inherits from `docker-compose-common.yml` to ensure a consistent build environment for tests.
        -   **scaffold-test**: Executes tests in the smart contracts environment.

-   **Dockerfile.Node**
    -   A standard Dockerfile for all Node.js-based services specifying Node version 20.12.2 and setting the working directory.

#### Here you can see the services architecture of the project 🏗️

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/SNvR2rWDKcbymH3tjhwbKa"></iframe>

### Environments 🌍

Currently, the project has two environments, **development** and **test**, with different configurations for the services. The development environment is used for the frontend and smart contracts development, while the test environment is used for running tests on the smart contracts.

## CI/CD Actions 🔄

Here you can see the CI/CD actions that are running on the project, with the tests, build and deploy of the frontend and contracts.

<iframe style={{border:"none"}} width="800" height="450" src="https://whimsical.com/embed/SQBbx2zRW1gtDkfZgQVcoq"></iframe>
