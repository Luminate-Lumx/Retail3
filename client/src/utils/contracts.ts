/*
InventoryManagement.json
LoyaltyRewards.json
Tether.json
TransactionManager.json
*/

class ContractABILoaderIPFS {
	private ipfs_folder_url: string;

	constructor(ipfs_folder_url) {
		this.ipfs_folder_url = ipfs_folder_url;
	}

	async load(contract_name: string) {
		const response = await fetch(this.ipfs_folder_url + contract_name + '.json');
		const data = await response.json();
		return data;
	}
}

export async function getContractABI(contract_name: string) {
	const InventoryContract = new ContractABILoaderIPFS(import.meta.env.VITE_DEPLOY_IPFS_FOLDER_URL).load(contract_name);
	return await InventoryContract;
}
