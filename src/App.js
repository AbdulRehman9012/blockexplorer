import { Alchemy, Network, toHex } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockdata, setblockdata] = useState();
  const [balance, setBalance] = useState();
  const [noNFTs, setnoNFTs] = useState();
  const Address="0xF5dA12442802619352FcD8Cc7245B7f76521d9a4";

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });
  
  useEffect(()=>{
    async function getBlockData(){
      setblockdata(await toString(alchemy.core.getBlockWithTransactions(blockNumber)))
    }
    
    getBlockData();
  });

  useEffect(()=>{
    async function getBalance(){
      setBalance(await parseFloat(alchemy.core.getBalance(Address)))
    }
    
    getBalance();
  });

  useEffect(()=>{
    async function getnoNFTs(){
      setnoNFTs(await parseInt(alchemy.nft.getNftsForOwner(Address)))
    }
    
    getnoNFTs();
  })


  return <div className='App'>
    <div className="App">Block Number : {blockNumber}</div>
    <div className="App">Block data :   {blockdata}</div>
    <div className="App">Balance :   {balance}</div>
    <div className="App">No. of NFTs :   {noNFTs}</div>
  </div>;
}

export default App;
