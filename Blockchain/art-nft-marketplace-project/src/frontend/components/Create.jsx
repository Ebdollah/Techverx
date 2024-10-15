import axios from 'axios';
import { useState } from 'react';
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';

const Create = ({ marketplace, nft }) => {
  const [fileImg, setFile] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1); // New state for quantity
  const navigate = useNavigate();

  const sendJSONtoIPFS = async (ImgHash) => {
    try {
      const resJSON = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
        data: {
          "name": name,
          "description": desc,
          "image": ImgHash,
        },
        headers: {
          'pinata_api_key': import.meta.env.VITE_PINATA_API_KEY,
          'pinata_secret_api_key': import.meta.env.VITE_PINATA_SECRET_API_KEY,
        },
      });

      const tokenURI = `https://gateway.pinata.cloud/ipfs/${resJSON.data.IpfsHash}`;
      console.log("Token URI", tokenURI);
      mintThenList(tokenURI);
    } catch (error) {
      console.log("JSON to IPFS: ", error);
    }
  };

  const sendFileToIPFS = async (e) => {
    e.preventDefault();

    if (fileImg) {
      try {
        const formData = new FormData();
        formData.append("file", fileImg);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': import.meta.env.VITE_PINATA_API_KEY,
            'pinata_secret_api_key': import.meta.env.VITE_PINATA_SECRET_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        sendJSONtoIPFS(ImgHash);
      } catch (error) {
        console.log("File to IPFS: ", error);
      }
    }
  };

  const mintThenList = async (uri) => {
    try {
      const quantityInt = parseInt(quantity);
      console.log("Starting batch mint with quantity:", quantityInt);
  
      // Mint multiple NFTs in bulk
      const mintTransaction = await nft.batchMint(uri, quantityInt);
      const mintReceipt = await mintTransaction.wait();
      console.log("Batch mint successful");
  
      // Get the token ID of the first minted NFT (assuming consecutive token IDs)
      const firstMintedTokenId = mintReceipt.events
        .filter(event => event.event === "Transfer")[0]
        .args.tokenId.toNumber();
  
      // Set approval for marketplace
      const approvalTransaction = await nft.setApprovalForAll(marketplace.address, true);
      await approvalTransaction.wait();
      console.log("Approval set for marketplace");
  
      // List the item in bulk on the marketplace
      const listingPrice = ethers.utils.parseEther(price.toString());
      const listTransaction = await marketplace.makeItem(nft.address, firstMintedTokenId, listingPrice, quantityInt);
      await listTransaction.wait();
      console.log("Item successfully listed in bulk with quantity:", quantityInt);
  
      navigate('/');
    } catch (error) {
      console.error("Error in mintThenList:", error);
    }
  };
  
  

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-center">
        <main role="main" className="w-full max-w-2xl">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="space-y-4">
              <input
                className="block w-full p-3 text-lg border rounded-lg focus:ring focus:ring-indigo-200"
                onChange={(e) => setFile(e.target.files[0])}
                required
                type="file"
              />
              <input
                className="block w-full p-3 text-lg border rounded-lg focus:ring focus:ring-indigo-200"
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                placeholder="Name"
              />
              <textarea
                className="block w-full p-3 text-lg border rounded-lg focus:ring focus:ring-indigo-200"
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Description"
              ></textarea>
              <input
                className="block w-full p-3 text-lg border rounded-lg focus:ring focus:ring-indigo-200"
                onChange={(e) => setPrice(e.target.value)}
                required
                type="number"
                placeholder="Price in ETH"
              />
              <input
                className="block w-full p-3 text-lg border rounded-lg focus:ring focus:ring-indigo-200"
                onChange={(e) => setQuantity(e.target.value)}
                required
                type="number"
                placeholder="Quantity" // New input field for quantity
                min="1"
              />
              <div className="flex justify-center">
                <button
                  className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  onClick={sendFileToIPFS}
                >
                  Create & List NFT!
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;
