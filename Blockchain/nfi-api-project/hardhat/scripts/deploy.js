const hre = require('hardhat');

async function main() {
  // Deploy NFT contract
  const NFT = await hre.ethers.getContractFactory('NFT');
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log('NFT deployed to:', nft.address);

  // Deploy Marketplace contract
  const feePercent = 1; // Example fee percent
  const Marketplace = await hre.ethers.getContractFactory('Marketplace');
  const marketplace = await Marketplace.deploy(feePercent);
  await marketplace.deployed();
  console.log('Marketplace deployed to:', marketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
