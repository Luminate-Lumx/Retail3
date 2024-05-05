import LumxAPI from 'lumx-node';

export function createLumxAPI() {
	return new LumxAPI({
		bearer: import.meta.env.VITE_LUMX_BEARER,
		web3_provider: import.meta.env.VITE_WEB3_PROVIDER,
		web3_wss_provider: import.meta.env.VITE_WEB3_WSS_PROVIDER,
	});
}
