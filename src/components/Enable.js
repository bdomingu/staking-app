import {React, useState} from 'react';
import Card from 'react-bootstrap/Card';
import { stakeAddress } from '../constants';
import Balance from './Balance';

function Enable({accountAddress, web3, ybcContract, stakeContract}) {

    const [amountToApprove, setAmountToApprove] = useState();

    async function approve() {
        if (!accountAddress) {
          window.alert("Please connect your wallet.")
        } else {
        const approveAmount = amountToApprove;
        ybcContract.methods.approve(web3.utils.toChecksumAddress(stakeAddress), web3.utils.toWei(approveAmount)).send({from: accountAddress})
        
        }
    }
function clearInput(){
        var getValue= document.getElementById("enable");
          if (getValue.value !=="") {
              getValue.value = "";
          }
}

  return (
    <div id='grid-start'>
      <Card style={{ width: '19rem'}}>
      <Card.Body>
        <Card.Text className='amountText'>
        Amount you staked
        </Card.Text>
        <Balance accountAddress={accountAddress} web3={web3} stakeContract={stakeContract}></Balance>
        <form >
        <Card.Text className='inputText'>Stake or Unstake your Amount</Card.Text>
        <input 
        className='input'
        id="enable"
        min='0.01'
        type="number" 
        step="0.01" 
        onInput={e => setAmountToApprove(e.target.value)}/>
        <div className='buttonSpace'>
        <button
        id="btn"
        type="submit"
        className="btn btn-glow btn-enable"
        variant="primary" 
        onClick={e => {
          e.preventDefault()
          approve()
          clearInput()
          }} >Enable stake/unstake</button>
        </div>
        </form>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Enable