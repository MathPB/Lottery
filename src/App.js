import React, {Component} from 'react';
import './App.css';
import web3 from './web3.js';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: ''
  };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }


  render(){
    // window.ethereum.enable()
    //   .then(web3.eth.getAccounts()
    //     .then(console.log));
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {this.state.manager}.<br></br>
        There are currently {this.state.players.length} people entered, 
        competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
      </p>
      <hr/>

      <form onSubmit={this.onSubmit}>
        <h4>Want to try you luck?</h4>
        <div>
          <label>Amout of ether to enter:</label>
          <br/>
          <input
            value = {this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </div>
        <button>Enter</button>
      </form>
    </div>
  );
}}
 
export default App;