---
sidebar_position: 0
title: Structures
---

Here you can find the structure of the project, including the smart contracts, frontend, offchain, docker services, and CI/CD workflow. 🏗️

## High Level Overview of user interaction 🌐

A user interaction diagram that shows the flow of the user interaction with the system. The user can register, create an event, check-in to an event, and validate the check-in.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/Hy7zLRFrPoBZBa9R27vPeY"></iframe>

## Overview technology architecture 🏗️

<iframe style={{border:"none"}} width="800" height="450" src="https://whimsical.com/embed/7DC1JXxUmhVjZmhsnzcKsz"></iframe>

## Folders 📁

-   [smartcontracts](https://github.com/Luminate-Lumx/Retail3/tree/main/smartcontracts): Repository of [Scaffold-op](https://github.com/ethereum-optimism/scaffold-op) with the smart contracts and tests for the project. 📜
-   [frontend](https://github.com/Luminate-Lumx/Retail3/tree/main/frontend): The [Next.js](https://nextjs.org/) application for the frontend of the project with [rainbowkit](https://www.rainbowkit.com/) and [wagmi](https://wagmi.sh/) for integration on the blockchain. 💻
-   [docs](https://github.com/Luminate-Lumx/Retail3/tree/main/docs): Documentation of the project with [docusaurus](https://docusaurus.io/). _You are here 🤓_.
-   [.github](https://github.com/Luminate-Lumx/Retail3/tree/main/.github): Github actions for the project, with the tests and autodeploy of the frontend and offchain services. 🛠️
-   `Dockerfile.* and docker-compose-*.yml`: Docker containers for the services of the project, with [docker-compose](https://docs.docker.com/compose/) for the development, production, and test environments. 🐳

## Contracts 📄

You can find the smart contracts in the [contracts folder](https://github.com/Luminate-Lumx/Retail3/tree/main/smartcontracts/packages/hardhat/contracts) and the tests in the [test folder](https://github.com/Luminate-Lumx/Retail3/tree/main/smartcontracts/packages/hardhat/test) of the repository. The contracts are written in Solidity and are used to manage the user registry, writing interactions, creation of new tokens, token transfers, etc. The tests are written in TypeScript and are used to ensure the contracts are functioning as expected with different scenarios.

### UserRegistry 📚

Manages user registrations and their facial identifiers, ensuring added security through encapsulation. Users are identified by addresses, and their data includes names and IPFS hashes of facial images. The contract employs modifiers to validate user existence, name, and face hash integrity. Features functions for registering, updating, and retrieving user information, with events logged for new registrations and updates.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/593qpT6XgHF1otJqQq3Ytu"></iframe>



## Docker 🐳

### Services 🛠️

List of all services that are in the project and their respective details.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/XBbpRHtAkJwhkaRnwKFDWy"></iframe>

### Environments 🌍

Here you can see the environments of the project and the services that are running in each one, with details of the command and the extended services.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/66BHieienPA7Z2ZDtwhtwk"></iframe>


### Dependencies 📊

In this diagram you can follow the dependencies of the services and dockerfiles of the project.

<iframe style={{border: "none"}} width="800" height="450" src="https://whimsical.com/embed/Liunwf1seSmkfHCkLJXJCo"></iframe>

## CI/CD Actions 🔄

Here you can see the CI/CD actions that are running on the project, with the tests, build and deploy of the frontend and offchain services.

<iframe style={{border:"none"}} width="800" height="450" src="https://whimsical.com/embed/FGkhpZen3Ckvb1binrGCUf"></iframe>
