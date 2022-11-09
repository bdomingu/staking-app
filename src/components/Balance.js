import {React, useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';

function Balance({accountAddress, stakeContract, web3}) {
    const [stakingBalance, setStakingBalance] = useState();
  
    useEffect(() => {
        async function getBalance() {
          const balance = await stakeContract.methods.stakedAmount(accountAddress).call()
          const newBalance =  web3.utils.fromWei((balance).toString(), 'ether')
          setStakingBalance(newBalance) 
        }
        getBalance()
      },[accountAddress]);
  return (
    <div>
        <Card className='amountCard'>
        <Card.Text className='smallYbc'>ybc</Card.Text>
        {accountAddress !== '' ? <Card.Body className='mediumYbc'>{stakingBalance} ybc</Card.Body> : <Card.Body className='mediumYbc'>-</Card.Body>}
        </Card>
    </div>
  )
}

export default Balance