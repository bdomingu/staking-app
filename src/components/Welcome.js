import React from 'react'
import Card from 'react-bootstrap/Card';

function Welcome({connectWallet}) {
  return (
    <div id='grid-start'>
    <Card style={{ width: '19rem'}}>
    <Card.Body>
      <Card.Text className='welcomeText'>
        Welcome to test app, to get started, connect your wallet
      </Card.Text>
      <button 
      className= "btn btn-glow btn-connect" 
      variant="primary" 
      onClick={connectWallet}>Connect your wallet</button>
    </Card.Body>
  </Card>
  </div>
  )
}

export default Welcome