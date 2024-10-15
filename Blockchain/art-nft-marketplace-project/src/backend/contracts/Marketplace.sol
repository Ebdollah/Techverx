// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    address payable public immutable feeAccount; // the account that receives fees
    uint public immutable feePercent; // the fee percentage on sales
    uint public itemCount;

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        uint quantity; // The total quantity available for sale
        uint sold;     // The number of items sold
    }

    mapping(uint => Item) public items;

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        uint quantity
    );

    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer,
        uint quantity
    );

    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function makeItem(IERC721 _nft, uint _tokenId, uint _price, uint _quantity) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        require(_quantity > 0, "Quantity must be greater than zero");

        itemCount++;
        _nft.transferFrom(msg.sender, address(this), _tokenId);

        items[itemCount] = Item(
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            _quantity,
            0
        );

        emit Offered(itemCount, address(_nft), _tokenId, _price, msg.sender, _quantity);
    }

    function purchaseItem(uint _itemId, uint _quantity) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId) * _quantity;
        Item storage item = items[_itemId];

        require(_itemId > 0 && _itemId <= itemCount, "Item doesn't exist");
        require(msg.value >= _totalPrice, "Not enough ether to cover item price and market fee");
        require(item.sold + _quantity <= item.quantity, "Not enough items available");

        item.seller.transfer(item.price * _quantity);
        feeAccount.transfer(_totalPrice - (item.price * _quantity));

        item.sold += _quantity;
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);

        emit Bought(_itemId, address(item.nft), item.tokenId, item.price, item.seller, msg.sender, _quantity);
    }

    function getTotalPrice(uint _itemId) view public returns (uint) {
        return (items[_itemId].price * (100 + feePercent)) / 100;
    }
}
