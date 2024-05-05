import LumxAPI from 'lumx-node';

export function createLumxAPI(bearer: string, web3_provider: string, web3_wss_provider: string) {
	return new LumxAPI({
		bearer: bearer,
		web3_provider: web3_provider,
		web3_wss_provider: web3_wss_provider,
	});
}
