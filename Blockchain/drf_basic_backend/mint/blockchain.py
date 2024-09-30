import json
from web3 import Web3
import os



# Setup Web3 connection (connect to Ganache or Infura for a real network)
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))  # Update with your provider
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Load the contract ABI and address
with open(os.path.join(BASE_DIR, '..', 'drf_basic_frontend', 'build', 'contracts', 'NFTCont.json')) as f:
    contract_data = json.load(f)

contract_address = '0x0D50d5fC06163F82859ea3B6D8326c106928F1A1'  # After deployment
contract_abi = contract_data['abi']

contract = w3.eth.contract(address=contract_address, abi=contract_abi)

def mint_nft(recipient_address):
    # Mint NFT on the blockchain
    tx_hash = contract.functions.createNFT(recipient_address).transact({
        'from': w3.eth.accounts[0],  # The address sending the transaction
        'gas': 3000000
    })
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    # Convert tx_receipt to a dict format if it's not already
    return dict(tx_receipt)  # Ensure that it can be serialized

