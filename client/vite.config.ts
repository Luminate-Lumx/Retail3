import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		'process.env': process.env,
		VITE_DEPLOY_IPFS_FOLDER_URL: process.env.VITE_DEPLOY_IPFS_FOLDER_URL,
		VITE_LUMX_BEARER: process.env.VITE_LUMX_BEARER,
		VITE_WEB3_PROVIDER: process.env.VITE_WEB3_PROVIDER,
		VITE_WEB3_WSS_PROVIDER: process.env.VITE_WEB3_WSS_PROVIDER,
	},
});
