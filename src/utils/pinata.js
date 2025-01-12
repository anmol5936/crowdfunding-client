import axios from 'axios';

const PINATA_API_KEY = 'd6399b434c91c8556a0d';
const PINATA_SECRET_KEY = '376333726e8f4fe1b5a3cd430552d69d9a0117887afe73b27c1bdc1965be4379';

export const uploadToPinata = async (file) => {
  if (!file) throw new Error('No file provided');

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY,
      },
    });

    const ipfsHash = res.data.IpfsHash;
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw new Error('Failed to upload image to Pinata');
  }
};