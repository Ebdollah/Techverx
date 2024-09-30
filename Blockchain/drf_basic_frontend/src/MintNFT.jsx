import { useState } from 'react';
import axios from 'axios';

// Function to get CSRF token from cookies
function getCSRFToken() {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('csrftoken=')) {
        cookieValue = decodeURIComponent(cookie.substring(10));
        break;
      }
    }
  }
  return cookieValue;
}

// Axios configuration
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;  // Allows sending cookies with the request

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",  // Base URL for your Django API
});

function MintNFT() {
  const [address, setAddress] = useState('');
  const [response, setResponse] = useState(null);

  // Function to handle minting NFT
  const mintNFT = async () => {
    const csrfToken = getCSRFToken();
    
    // const csrfToken = "yGXaNZOkk1ExqdwSAu2RQYGROfy3uTOB";
    alert(csrfToken)
    if (!csrfToken) {
      console.error("CSRF Token is missing");
      return;
    }

    try {
      const res = await client.post("/api/mint/", 
      {
        recipient_address: address,  // Sending recipient address in the request body
      },
      {
        headers: {
          'X-CSRFToken': csrfToken  // Include CSRF token in request headers
        }
      });
      setResponse(res.data);  // Update response state with the data from API
    } catch (error) {
      console.error("Error minting NFT:", error);
      setResponse({ error: "Failed to mint NFT" });  // Error handling
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Mint Your NFT</h2>
        <input
          type="text"
          placeholder="Recipient Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={mintNFT}
          className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-200"
        >
          Mint NFT
        </button>
        {response && (
          <p className="mt-4 text-center text-gray-700">{JSON.stringify(response)}</p>
        )}
      </div>
    </div>
  );
}

export default MintNFT;
