export async function sendFileToIPFS(file: File) {
	const formData = new FormData();
	formData.append('file', file);

	const PINATA_API_SECRET = import.meta.env.VITE_PINATA_JWT;

	const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${PINATA_API_SECRET}`,
		},
		body: formData,
	});

	const data = await res.json();

	return data;
}
