import {React, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Balance from './Balance';


function StakeUnstake({web3, stakeContract, accountAddress}) {
    const [stakingUnstakingAmount, setStakingUnstakingAmount] = useState();

    async function stakeIt() {
        const amountToStakeUnstake = stakingUnstakingAmount;
        stakeContract.methods.stake(web3.utils.toWei(amountToStakeUnstake)).send({from: accountAddress})
        
      }
    
    async function unstakeIt() {
        const amountToStakeUnstake = stakingUnstakingAmount;
        stakeContract.methods.unstake(web3.utils.toWei(amountToStakeUnstake)).send({from: accountAddress});
      
      }

      function clearInput(){
        var getValue= document.getElementById("stake");
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
        <form>
        <Card.Text className='inputText'>Stake or Unstake your Amount</Card.Text>
        <input
        id="stake"
        className='input'
        type="number"
        min="0.01"
        step="0.01"
        onInput={e => setStakingUnstakingAmount(e.target.value)}/>
        <div className='buttonSpace'>
        <button
        className= "btn btn-glow btn-stake"
        variant="primary" 
        onClick={e => {
          e.preventDefault()
          stakeIt()
          clearInput() } }>
        Stake
          </button>
        <button
        className="btn btn-glow2 btn-unstake"
        variant="primary"
        onClick={e => {
          e.preventDefault()
          unstakeIt()
          clearInput()}}>Unstake</button>
        </div>
        </form>
      </Card.Body>
    </Card>
    </div>
  )
}

export default StakeUnstake