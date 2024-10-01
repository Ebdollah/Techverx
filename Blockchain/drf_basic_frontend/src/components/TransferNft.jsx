import { useState } from 'react';
import axios from 'axios';

function TransferNft() {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [response, setResponse] = useState(null);

  const transferNFT = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/transfer/', {
        from_address: fromAddress,
        to_address: toAddress,
        token_id: tokenId,
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Error transferring NFT:', error);
      setResponse({ error: 'Failed to transfer NFT' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Transfer NFT</h2>
        <input
          type="text"
          placeholder="From Address"
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="To Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
        <button
          onClick={transferNFT}
          className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-200"
        >
          Transfer NFT
        </button>
        {response && (
          <p className="mt-4 text-center text-gray-700">{JSON.stringify(response)}</p>
        )}
      </div>
    </div>
  );
}

export default TransferNft;
