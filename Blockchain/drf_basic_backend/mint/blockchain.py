# blockchain.py
import json
from web3 import Web3
import os
from eth_utils import to_wei
from .models import NFTListing

# Setup Web3 connection (connect to Ganache or Infura for a real network)
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))  # Update with your provider

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Load the contract ABI and address
with open(os.path.join(BASE_DIR, '..', 'drf_basic_frontend', 'build', 'contracts', 'NFTCont.json')) as f:
    contract_data = json.load(f)

contract_address = '0xfB3e92F5433735971Eb552941bEAaDdc83091f0e'  # After deployment
contract_abi = contract_data['abi']

contract = w3.eth.contract(address=contract_address, abi=contract_abi)

def mint_nft(recipient_address, token_uri, price):
    """
    Mint a new NFT with metadata URI and price
    """
    # Convert price to wei
    price_wei = to_wei(price, 'ether')
    
    # Get the account that will pay for the transaction
    sender_account = w3.eth.accounts[0]
    
    # Build the transaction
    tx = contract.functions.mintNFT(
        recipient_address,
        token_uri,
        price_wei
    ).build_transaction({
        'from': sender_account,
        'gas': 3000000,
        'nonce': w3.eth.get_transaction_count(sender_account)
    })
    
    # Sign and send the transaction
    signed_tx = w3.eth.account.sign_transaction(tx, private_key='your_private_key')
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    
    # Get the token ID from the event logs
    mint_event = contract.events.NFTMinted().process_receipt(tx_receipt)[0]
    token_id = mint_event['args']['tokenId']
    
    # Save to database
    NFTListing.objects.create(
        token_id=token_id,
        seller_address=recipient_address,
        sale_price=price,
        token_uri=token_uri,
        is_available=True
    )
    
    return tx_receipt, token_id, recipient_address

def list_nft_for_sale(token_id, price, seller_address):
    """
    List an NFT for sale
    """
    price_wei = to_wei(price, 'ether')
    
    tx = contract.functions.listNFTForSale(
        token_id,
        price_wei
    ).build_transaction({
        'from': seller_address,
        'gas': 3000000,
        'nonce': w3.eth.get_transaction_count(seller_address)
    })
    
    signed_tx = w3.eth.account.sign_transaction(tx, private_key='seller_private_key')
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    
    # Update database
    listing = NFTListing.objects.get(token_id=token_id)
    listing.sale_price = price
    listing.is_available = True
    listing.save()
    
    return tx_receipt

def transfer_nft(from_address, to_address, token_id):
    # Transfer NFT using safeTransferFrom function
    tx_hash = contract.functions.safeTransferFrom(from_address, to_address, token_id).transact({
        'from': from_address,  # Sender of the transaction
        'gas': 3000000
    })
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    return dict(tx_receipt)

def approve_nft(seller_address, approved_address, token_id):
    tx_hash = contract.functions.approve(approved_address, token_id).transact({
        'from': seller_address,  # Use the seller's address
        'gas': 3000000
    })
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    return dict(tx_receipt)


def buy_nft(buyer_address, token_id):
    # Fetch the NFT listing from the database
    nft_listing = NFTListing.objects.get(token_id=token_id)

    # Ensure the NFT is available for sale
    if not nft_listing.is_available:
        raise Exception("This NFT is not available for sale.")

    # Check if the buyer has enough ETH to cover the sale price
    buyer_balance = w3.eth.get_balance(buyer_address)
    sale_price_in_wei = to_wei(nft_listing.sale_price, 'ether')

    if buyer_balance < sale_price_in_wei:
        raise Exception("Insufficient funds to buy this NFT.")

    # Transfer the NFT and ETH from the buyer to the seller
    tx_hash = contract.functions.buyNFT(token_id).transact({
        'from': buyer_address,
        'value': sale_price_in_wei,  # Send ETH with the transaction
        'gas': 3000000
    })

    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    # Update the listing status to not available
    nft_listing.is_available = False
    nft_listing.save()

    return dict(tx_receipt)



# working buy

# def buy_nft(buyer_address, token_id):
#     # Fetch the NFT listing from the database
#     nft_listing = NFTListing.objects.get(token_id=token_id)

#     # Ensure the NFT is available for sale
#     if not nft_listing.is_available:
#         raise Exception("This NFT is not available for sale.")

#     # Check if the buyer has enough ETH to cover the sale price
#     buyer_balance = w3.eth.get_balance(buyer_address)
#     sale_price_in_wei = to_wei(nft_listing.sale_price, 'ether')  # Use to_wei from eth_utils

#     if buyer_balance < sale_price_in_wei:
#         raise Exception("Insufficient funds to buy this NFT.")

#     # Transfer the NFT from the seller to the buyer
#     tx_hash = contract.functions.safeTransferFrom(
#         nft_listing.seller_address, 
#         buyer_address, 
#         token_id
#     ).transact({
#         'from': buyer_address,  # Buyer is sending the transaction
#         'gas': 3000000
#     })
    
#     tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

#     # Update the listing status to not available
#     nft_listing.is_available = False
#     nft_listing.save()

#     return dict(tx_receipt)



# def buy_nft(buyer_address, token_id):
#     # Fetch the NFT listing from the database
#     nft_listing = NFTListing.objects.get(token_id=token_id)

#     # Ensure the NFT is available for sale
#     if not nft_listing.is_available:
#         raise Exception("This NFT is not available for sale.")

#     # Check if the buyer has enough ETH to cover the sale price
#     buyer_balance = w3.eth.get_balance(buyer_address)
#     sale_price_in_wei = to_wei(nft_listing.sale_price, 'ether')

#     if buyer_balance < sale_price_in_wei:
#         raise Exception("Insufficient funds to buy this NFT.")

#     # Transfer the NFT and ETH in one transaction
#     tx_hash = contract.functions.buyNFT(token_id).transact({
#         'from': buyer_address,  # Buyer is sending the transaction
#         'value': sale_price_in_wei,  # Send the sale price
#         'gas': 3000000
#     })
    
#     tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

#     # Update the listing status to not available
#     nft_listing.is_available = False
#     nft_listing.save()

#     return dict(tx_receipt)
