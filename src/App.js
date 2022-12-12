import './App.css';
import React from 'react';
import { pinJSONToIPFS } from './utils/pinata';
import PlaceHolderImage from "./placeholder.png"
import ContractAbi from "./artifact/contracts/MyToken.sol/MyToken.json";
const { ethers } = require('ethers')
// const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/Rpi6XUJtW77feZx0M7KzI25DMjrLD611')

function App() {
  const [nftMetadata, setNftMetadata] = React.useState({});
  const [balance, setBalance] = React.useState(0);

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  };



  const uploadToIFPS = async () => {
    const pinataResponse = await pinJSONToIPFS({
      name: 'AI Generated NFT',
      description: 'AI Generated NFT',
      image: PlaceHolderImage
    });
    console.log('pinataResponse', pinataResponse)
    mintNft(pinataResponse.pinataUrl)
  }

  const mintNft = async (metadataURI) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log('ContractAbi.abi', ContractAbi.abi)
    console.log('address[0]', address[0])
    const contract = new ethers.Contract(address[0], ContractAbi.abi, signer);
    const result = await contract.mintNFT(address[0], metadataURI)
    let res = await result.wait();
    console.log("res", res);
  }


  return (
    <div className="App">
      <h1>NFT Minter</h1>
      <p>Balance: {balance}</p><button onClick={getBalance}>Get Balance</button>
      <button onClick={uploadToIFPS}>Mint</button>
    </div>
  );
}

export default App;
