import { useState, useEffect } from 'react'
import { ethers } from "ethers"

function renderSoldItems(items) {
  return (
    <>
      <h2 className="text-2xl font-semibold my-4">Sold</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-3">
        {items.map((item, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg shadow-lg">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4 bg-gray-100">
              <p>
                For {ethers.utils.formatEther(item.totalPrice)} ETH - Received {ethers.utils.formatEther(item.price)} ETH
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default function MyListedItems({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true)
  const [listedItems, setListedItems] = useState([])
  const [soldItems, setSoldItems] = useState([])

  const loadListedItems = async () => {
    const itemCount = await marketplace.itemCount()
    let listedItems = []
    let soldItems = []
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx)
      if (i.seller.toLowerCase() === account) {
        const uri = await nft.tokenURI(i.tokenId)
        const response = await fetch(uri)
        const metadata = await response.json()
        const totalPrice = await marketplace.getTotalPrice(i.itemId)

        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        }
        listedItems.push(item)
        if (i.sold) soldItems.push(item)
      }
    }
    setLoading(false)
    setListedItems(listedItems)
    setSoldItems(soldItems)
  }

  useEffect(() => {
    loadListedItems()
  }, [])

  if (loading) return (
    <main className="p-4">
      <h2 className="text-center">Loading...</h2>
    </main>
  )

  return (
    <div className="flex justify-center">
      {listedItems.length > 0 ? (
        <div className="px-5 py-3 container">
          <h2 className="text-2xl font-semibold mb-4">Listed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-3">
            {listedItems.map((item, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg shadow-lg">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4 bg-gray-100">
                  <p>{ethers.utils.formatEther(item.totalPrice)} ETH</p>
                </div>
              </div>
            ))}
          </div>
          {soldItems.length > 0 && renderSoldItems(soldItems)}
        </div>
      ) : (
        <main className="p-4">
          <h2 className="text-center">No listed assets</h2>
        </main>
      )}
    </div>
  )
}
