import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';

const NFTDetails = ({ marketplace, nft, account }) => {
  const { id } = useParams(); // Get the item ID from the URL
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const loadNFTDetails = async () => {
    try {
      // Get item details from the marketplace
      const fetchedItem = await marketplace.items(id);
      const uri = await nft.tokenURI(fetchedItem.tokenId);
      const response = await fetch(uri);
      const metadata = await response.json();
      const totalPrice = await marketplace.getTotalPrice(fetchedItem.itemId);
      const owner = await nft.ownerOf(fetchedItem.tokenId);

      setItem({
        itemId: fetchedItem.itemId,
        tokenId: fetchedItem.tokenId,
        price: totalPrice,
        seller: fetchedItem.seller,
        owner,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
      });

      // Check if the current account is the owner of the NFT
      setIsOwner(account.toLowerCase() === owner.toLowerCase());

      setLoading(false);
    } catch (error) {
      console.error("Error loading NFT details:", error);
    }
  };

  useEffect(() => {
    loadNFTDetails();
  }, [id, account]);

  if (loading) return <h2 className="text-center">Loading...</h2>;

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-2xl font-semibold mt-4">{item.name}</h2>
            <p className="mt-2 text-gray-600">{item.description}</p>
            <p className="mt-4 text-lg">Price: {ethers.utils.formatEther(item.price)} ETH</p>
            <p className="mt-2 text-sm text-gray-500">Seller: {item.seller}</p>
            <p className="mt-2 text-sm text-gray-500">Owner: {item.owner}</p>
            <p className="mt-4 font-bold">
              {isOwner ? "You are the owner of this NFT" : "You are not the owner of this NFT"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;
