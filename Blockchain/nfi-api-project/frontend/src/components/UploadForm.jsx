import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import NFTAbi from '../contracts/NFT.json';
import MarketplaceAbi from '../contracts/Marketplace.json';

function UploadForm() {
  // State variables
  const NFTAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const MarketplaceAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
  const [fileImg, setFileImg] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        const newSigner = newProvider.getSigner();
        const address = await newSigner.getAddress();
        setUserAddress(address);
        setProvider(newProvider);
        setSigner(newSigner);
        setWalletConnected(true);
        console.log('Wallet connected:', address);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  // Function to disconnect wallet (optional)
  const disconnectWallet = () => {
    setWalletConnected(false);
    setUserAddress('');
    setProvider(null);
    setSigner(null);
    console.log('Wallet disconnected');
  };

  // Ensure that the signer is always updated when the wallet connects
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        const address = accounts[0];
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        const newSigner = newProvider.getSigner();
        setUserAddress(address);
        setProvider(newProvider);
        setSigner(newSigner);
        setWalletConnected(true);
        console.log('Account changed:', address);
      } else {
        disconnectWallet();
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts) => {
          if (accounts.length > 0) {
            const address = accounts[0];
            const newProvider = new ethers.providers.Web3Provider(window.ethereum);
            const newSigner = newProvider.getSigner();
            setUserAddress(address);
            setProvider(newProvider);
            setSigner(newSigner);
            setWalletConnected(true);
          }
        })
        .catch((err) => {
          console.error('Error checking connected accounts:', err);
        });

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  // Ensure the signer is still available before allowing form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletConnected || !signer) {
      alert('Please connect your wallet and try again.');
      return;
    }

    if (!fileImg || !name || !description || !price) {
      alert('Please fill out all fields.');
      return;
    }

    // Upload image and metadata to backend
    const formData = new FormData();
    formData.append('file', fileImg);
    formData.append('name', name);
    formData.append('description', description);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      const { tokenURI } = res.data;

      // Proceed to mint and list the NFT
      await mintAndList(tokenURI);
    } catch (error) {
      console.error('Error uploading to backend:', error);
    }
  };

  // Function to mint and list the NFT
  const mintAndList = async (tokenURI) => {
    try {
      if (!signer) {
        alert('Wallet not connected properly. Please reconnect.');
        return;
      }

      // Mint NFT
      const nftContract = new ethers.Contract(NFTAddress, NFTAbi.abi, signer);
      const mintTx = await nftContract.mint(tokenURI);
      console.log('Minting NFT...');
      const mintTxReceipt = await mintTx.wait();
      const tokenId = mintTxReceipt.events[0].args[2].toNumber();
      console.log('NFT minted with Token ID:', tokenId);

      // Approve Marketplace to transfer NFT
      const approveTx = await nftContract.approve(MarketplaceAddress, tokenId);
      await approveTx.wait();
      console.log('Marketplace approved');

      // List NFT on Marketplace
      const priceInWei = ethers.utils.parseUnits(price, 'ether');
      const marketplaceContract = new ethers.Contract(MarketplaceAddress, MarketplaceAbi.abi, signer);
      const listingFeePercent = await marketplaceContract.feePercent();
      const fee = priceInWei.mul(listingFeePercent).div(100);
      const listTx = await marketplaceContract.makeItem(NFTAddress, tokenId, priceInWei, { value: fee });
      await listTx.wait();
      console.log('NFT listed on marketplace');

      alert('NFT minted and listed successfully!');
    } catch (error) {
      console.error('Error minting and listing NFT:', error);
      alert('An error occurred during the minting and listing process.');
    }
  };

  return (
    <div>
      {!walletConnected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected: {userAddress}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFileImg(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price in ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Create and Mint NFT</button>
      </form>
    </div>
  );
}

export default UploadForm;
