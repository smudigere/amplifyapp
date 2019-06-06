import React from 'react';
import ReactDOM from 'react-dom';
import '../home/index.css';

class Home extends React.Component  {
  render()  {
    return(
      <div>
        <h1>Welcome to Sammy's games</h1><br/>
        <h2>What game would you like to play?</h2><br/><br/>
        <p>Please choose from the options above</p>
        <i class="material-icons">face</i>
      </div>
    )
  }
}

export default Home
