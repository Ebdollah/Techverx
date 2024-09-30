import Web3 from 'web3';
import { useEffect, useState } from 'react';
// import SimpleStorageContract from './build/SimpleStorage.json';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'

function SimpleStorage() {
  const [account, setAccount] = useState('');
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          // Network id of Ganache
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = SimpleStorageContract.networks[networkId];
          const contractInstance = new web3.eth.Contract(
            SimpleStorageContract.abi,
            deployedNetwork && deployedNetwork.address
          );

          setContract(contractInstance);
          setWeb3(web3);
        } catch (error) {
          console.error("Error connecting to MetaMask", error);
        }
      } else {
        console.log('Please install MetaMask');
      }
    };
    initWeb3();
  }, []);

  const setStorage = async (value) => {
    if (contract) {
      await contract.methods.set(value).send({ from: account });
      const result = await contract.methods.get().call();
      setStorageValue(result);
    }
  };

  return (
    <div>
      <h1>React Blockchain App</h1>
      <p>Account: {account}</p>
      <p>Stored Value: {storageValue}</p>
      <input
        type="number"
        onChange={(e) => setStorage(e.target.value)}
        placeholder="Set Storage Value"
      />
    </div>
  );
}

export default SimpleStorage;
