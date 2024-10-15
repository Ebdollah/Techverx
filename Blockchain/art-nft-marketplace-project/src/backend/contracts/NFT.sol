// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;

    constructor() ERC721("DApp NFT", "DAPP"){}

    function mint(string memory _tokenURI) external returns(uint) {
        tokenCount ++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return(tokenCount);
    }

    // New function to mint multiple NFTs
    function batchMint(string memory _tokenURI, uint _quantity) external returns(uint[] memory) {
        require(_quantity > 0, "Quantity must be greater than zero");
        uint[] memory tokenIds = new uint[](_quantity);

        for (uint i = 0; i < _quantity; i++) {
            tokenCount ++;
            _safeMint(msg.sender, tokenCount);
            _setTokenURI(tokenCount, _tokenURI);
            tokenIds[i] = tokenCount;
        }

        return tokenIds;
    }
}
