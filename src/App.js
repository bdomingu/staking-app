import './App.css';
import {React, useState, useEffect} from 'react';
import stakingAbi from './stakingAbi.json';
import ybcAbi from './ybcAbi.json';
import Web3 from 'web3';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';





const ybcContractAddress = "0x0FDeDdA0b61Eb0Bce9B8000FD18331E8bf508338"
const stakeContractAddress = "0xD80b3E1992f8D619E13B82F9a71d706ced9d0874";


function App() {
  
  const [accountAddress, setAccountAddress] = useState();
  const [amountToApprove, setAmountToApprove] = useState();
  const [stakingUnstakingAmount, setStakingUnstakingAmount] = useState();
  const [stakingBalance, setStakingBalance] = useState();
  
  const {ethereum} = window;
  let web3 = new Web3(window.ethereum);
  
  const ybcContract = new web3.eth.Contract(ybcAbi, ybcContractAddress);
  const stakeContract = new web3.eth.Contract(stakingAbi, stakeContractAddress);

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
    setAccountAddress(account[0]);
    // console.log(accountAddress)
  

    window.alert("Connected wallet address " + account)

    
    
  }

async function approve() {
  console.log(web3.utils.toChecksumAddress(stakeContractAddress))
  const approveAmount = amountToApprove;
  ybcContract.methods.approve(web3.utils.toChecksumAddress(stakeContractAddress), web3.utils.toWei(approveAmount)).send({from: accountAddress})
  console.log(approveAmount)
}

async function stakeIt() {
    const amountToStakeUnstake = stakingUnstakingAmount;
    stakeContract.methods.stake(web3.utils.toWei(amountToStakeUnstake)).send({from: accountAddress})
    console.log(amountToStakeUnstake)
  }

async function unstakeIt() {
    const amountToStakeUnstake = stakingUnstakingAmount;
    stakeContract.methods.unstake(web3.utils.toWei(amountToStakeUnstake)).send({from: accountAddress});
    console.log(amountToStakeUnstake)
  }

useEffect(() => {
async function getBalance() {
  const balance = await stakeContract.methods.stakedAmount(accountAddress).call()
  const newBalance =  web3.utils.fromWei((balance).toString(), 'ether')
  setStakingBalance(newBalance)
  console.log(stakingBalance);

}

getBalance()
},[accountAddress]);


  return (
    <div className="App">
      <Card style={{ width: '19rem'}}>
      <Card.Body>
        <Card.Text>
          Welcome to test app, to get started, connect your wallet
        </Card.Text>
        <Button variant="primary" onClick={connectWallet}>Connect your wallet</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '19rem'}}>
      <Card.Body>
        <Card.Text>
        Amount you staked
        </Card.Text>
        <Card>
        <Card.Body>{stakingBalance} ybc</Card.Body>
        </Card>
        <form>
        <input 
        type="number" 
        step="0.01" 
        onInput={e => setAmountToApprove(e.target.value)}/>
        <Button variant="primary" onClick={approve}>Enable stake/unstake</Button>
        </form>
      </Card.Body>
    </Card>
    <Card style={{ width: '19rem'}}>
      <Card.Body>
        <Card.Text>
       Amount you staked
        </Card.Text>
        <Card>
        <Card.Body>{stakingBalance} ybc</Card.Body>
        </Card>
        <form>
        <input 
        type="number" 
        step="0.01" 
        onInput={e => setStakingUnstakingAmount(e.target.value)}/>
        <Button variant="primary" onClick={stakeIt}>Stake</Button>
        <Button variant="primary" onClick={unstakeIt}>Unstake</Button>
        </form>
      </Card.Body>
    </Card>
    </div>
  );
}

export default App;
