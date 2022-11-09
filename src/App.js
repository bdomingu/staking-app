import './App.css';
import {React, useState} from 'react';
import Web3 from 'web3';
import { stakingAbi, ybcAbi, stakeAddress, ybcAddress,} from './constants';
import Welcome from './components/Welcome';
import Enable from './components/Enable';
import StakeUnstake from './components/StakeUnstake';


function App() {
  
  const [accountAddress, setAccountAddress] = useState('');
  
  
  let web3 = new Web3(window.ethereum);
  
  const ybcContract = new web3.eth.Contract(ybcAbi, ybcAddress);
  const stakeContract = new web3.eth.Contract(stakingAbi, stakeAddress);


  const connectWallet = async() => {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    const account = await window.ethereum.request({method: "eth_requestAccounts"}); 
    const address = account[0]
    setAccountAddress(address);
    
    window.alert("Connected wallet address " + address) 

  }

  return (
   <div id='grid-start'>
   <Welcome connectWallet={connectWallet}></Welcome>
   <Enable stakeContract={stakeContract} ybcContract={ybcContract} accountAddress={accountAddress} web3={web3}></Enable>
   <StakeUnstake web3={web3} stakeContract={stakeContract} accountAddress={accountAddress}></StakeUnstake>
   </div>
  );
}

export default App;
