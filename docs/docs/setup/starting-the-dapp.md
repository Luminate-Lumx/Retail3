---
title: Starting the DApp
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## About Docker Files 🐳

In this project, we use multiple Docker Compose files tailored to different stages of the development and deployment lifecycle. Each Docker Compose file leverages services defined in a shared `docker-compose-common.yml` for consistency and maintainability.

### Docker Compose Files:

-   **`docker-compose-client.yml`**: Runs the client application in development mode with live reloading.
-   **`docker-compose-smartcontracts.yml`**: Handles the deployment of smart contracts and starts a local server for the DApp frontend.
-   **`docker-compose-test.yml`**: Used for running automated tests in a controlled environment.

## Starting the DApp ⚙️

With prerequisites installed and the project repository cloned, start the Docker containers using one of the following commands based on the desired environment:

<Tabs defaultValue="dev" values={[
{ label: 'Development', value: 'dev' },
{ label: 'Testnet Deploy', value: 'deploy' },
{ label: 'Unit Tests', value: 'test' }
]}>

<TabItem value="dev">
Instructions for Development Environment:

1. First, deploy the smart contracts to the testnet using the command below:

    ```bash
    docker compose -f docker-compose-smartcontracts.yml up
    ```

2. Store the `smartcontracts/packages/hardhat/deployments` ABIs on IPFS and get the folder URL.
3. Update the `VITE_DEPLOY_IPFS_FOLDER_URL` environment variable in your `.env` file with the IPFS folder URL.
4. Start the client application with the command above with:

    ```bash
    docker compose -f docker-compose-client.yml up --build
    ```

</TabItem>

<TabItem value="deploy">

```bash
docker compose -f docker-compose-smartcontracts.yml up
```

This command deploys your smart contracts to the testnet and runs a local server along with the DApp next frontend to interact with the deployed contracts. The frontend will be available at `http://localhost:3000`.

</TabItem>

<TabItem value="test">

```bash
docker compose -f docker-compose-test.yml up
```

This command is used to execute the unit tests for the smart contracts.

</TabItem>
</Tabs>
