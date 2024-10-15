import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router';

const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const navigate = useNavigate()

  const loadMarketplaceItems = async () => {
    const itemCount = await marketplace.itemCount();
    // alert(itemCount)
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (item.quantity > item.sold) { // Check if there's remaining quantity
        const uri = await nft.tokenURI(item.tokenId);
        const response = await fetch(uri);
        const metadata = await response.json();
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          quantity: item.quantity,
          sold: item.sold,
        });
      }
    }
    setLoading(false);
    setItems(items);
  };

  const buyMarketItem = async (item, quantity) => {
    await (
      await marketplace.purchaseItem(item.itemId, quantity, {
        value: item.totalPrice.mul(quantity),
      })
    ).wait();
    loadMarketplaceItems();
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  if (loading)
    return (
      <main className="p-4">
        <h2 className="text-center">Loading...</h2>
      </main>
    );

  return (
    <div className="flex justify-center">
      {items.length > 0 ? (
        <div className="px-5 container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-5">
            {items.map((item, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg shadow-lg">
              <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => navigate(`/nft/${item.itemId}`)} // Navigate to details page
                />
                <div className="p-4 bg-gray-100">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-600">
                    Available: {item.quantity - item.sold}
                  </p>
                </div>
                <div className="p-4 bg-gray-200">
                  <input
                    type="number"
                    min="1"
                    max={item.quantity - item.sold}
                    defaultValue="1"
                    className="w-full p-2 mb-2 border rounded-lg"
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                  />
                  <button
                    onClick={() => buyMarketItem(item, selectedQuantity)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Buy for{' '}
                    {ethers.utils.formatEther(item.totalPrice.mul(selectedQuantity))} ETH
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <main className="p-4">
          <h2 className="text-center">No listed assets</h2>
        </main>
      )}
    </div>
  );
};

export default Home;
