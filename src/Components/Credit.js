import React, { Component } from "react";
import {Redirect} from 'react-router-dom';

class Credit extends Component {
  constructor(props) {
    super(props);

    this.state = {    
      obj:{
        id:0,
        description: "",
        amount: 0,
        date: "",
      },
      redirect: false,
    };
    
  }

  handleTransaction =(event) => {
    const updatedCredit = {...this.state.obj};
        const inputField = event.target.name;
        const inputValue= event.target.value;
        
        updatedCredit[inputField] = inputValue;
        this.setState({obj: updatedCredit});
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    this.props.addToCreditHistory(this.state.obj);
    this.setState({redirect: true});
};
  


  render() {
    if(this.state.redirect)
        {
            return <Redirect to="/"/>;
        }
    return (
      <div>
        <h1>Credits</h1>
        <br></br>
        <h2 >Account balance: ${this.props.accountBalance}</h2>
        <h4>Add transaction</h4>
        <form >
          <label /*for="description"*/>Description:</label>
          <input
            type="text"
            name="description"
            value={this.state.obj.description}
            onChange={this.handleTransaction} 
          />
          <br></br>
          <label /*for="amount"*/>Amount:</label>
          <input
            type="text"
            name="amount"
            value={this.state.obj.amount}
            onChange={this.handleTransaction}
          />
          <br></br>
          <button type="button" onClick={this.handleSubmit} >Add credit</button>
        </form>
        <ul>
          {this.props.creditsHistory.map((credit) => (
            <li key={credit.id}>
              Description: {credit.description} <br></br> Amount: {credit.amount}
              <br></br> Date: {credit.date}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Credit;
