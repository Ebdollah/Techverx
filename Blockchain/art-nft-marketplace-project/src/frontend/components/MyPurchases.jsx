import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function MyPurchases({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [sellPrice, setSellPrice] = useState(''); // New state for sell price
  const navigate = useNavigate(); // Initialize navigate

  const loadPurchasedItems = async () => {
    const filter = marketplace.filters.Bought(null, null, null, null, null, account);
    const results = await marketplace.queryFilter(filter);

    const purchases = await Promise.all(results.map(async i => {
      i = i.args;
      const uri = await nft.tokenURI(i.tokenId);
      const response = await fetch(uri);
      const metadata = await response.json();
      const totalPrice = await marketplace.getTotalPrice(i.itemId);

      let purchasedItem = {
        totalPrice,
        price: i.price,
        itemId: i.itemId,
        tokenId: i.tokenId, // Include tokenId for details navigation
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
      };
      return purchasedItem;
    }));

    setLoading(false);
    setPurchases(purchases);
  };

  useEffect(() => {
    loadPurchasedItems();
  }, []);

  // Function to list the purchased NFT for sale
  const listNFTForSale = async (item) => {
    try {
      const listingPrice = ethers.utils.parseEther(sellPrice); // Convert ETH to wei

      // Set approval for marketplace to handle the NFT
      const approvalTransaction = await nft.setApprovalForAll(marketplace.address, true);
      await approvalTransaction.wait();

      // List the NFT on the marketplace
      const listTransaction = await marketplace.makeItem(nft.address, item.tokenId, listingPrice, 1);
      await listTransaction.wait();
      console.log("NFT listed successfully!");

      // Reload purchased items to reflect changes
      loadPurchasedItems();
      navigate('/'); // Navigate back to home page after listing
    } catch (error) {
      console.error("Error listing NFT for sale:", error);
    }
  };

  if (loading) return (
    <main className="p-4">
      <h2 className="text-center">Loading...</h2>
    </main>
  );

  return (
    <div className="flex justify-center">
      {purchases.length > 0 ? (
        <div className="px-5 container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-5">
            {purchases.map((item, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => navigate(`/nft/${item.itemId}`)} // Navigate to details page on image click
                />
                <div className="p-4 bg-gray-100">
                  <p>{item.name}</p>
                  <p>{ethers.utils.formatEther(item.totalPrice)} ETH</p>

                  {/* Input field for selling price */}
                  <input
                    type="number"
                    placeholder="Enter Sell Price in ETH"
                    className="block w-full p-2 mt-2 mb-2 border rounded-lg"
                    onChange={(e) => setSellPrice(e.target.value)}
                  />

                  {/* Sell button */}
                  <button
                    onClick={() => listNFTForSale(item)} // Call function to list NFT for sale
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Sell NFT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <main className="p-4">
          <h2 className="text-center">No purchases</h2>
        </main>
      )}
    </div>
  );
}
