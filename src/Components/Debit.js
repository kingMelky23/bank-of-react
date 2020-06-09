import React, { Component } from "react";
import {Redirect} from 'react-router-dom';

class Debit extends Component {
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
    const updatedDebit = {...this.state.obj};
        const inputField = event.target.name;
        const inputValue= event.target.value;
        //const id = (Math.random() * 300).toString();
        updatedDebit[inputField] = inputValue;
        this.setState({obj: updatedDebit});
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    this.props.addToDebitHistory(this.state.obj);
    this.setState({redirect: true});
};
  


  render() {
    if(this.state.redirect)
        {
            return <Redirect to="/"/>;
        }
    return (
      <div>
        <h1>Debits</h1>
        <br></br>
        <h2>Total debit: ${this.props.accountBalance}</h2>
        <h4>Add transaction</h4>
        <form >
          <label /*for="description"*/>Description:</label>
          <input
            type="text"
            name="description"
            value={this.state.obj.description}
            onChange={this.handleTransaction}
            placeholder ="text"
          />
          <br></br>
          <label /*for="amount"*/>Amount:</label>
          <input
            type="text"
            name="amount"
            value={this.state.obj.amount}
            onChange={this.handleTransaction} placeholder = "amount"
          />
          <br></br>
          <button type="button" onClick={this.handleSubmit} >Add debit</button>
        </form>
        <ul>
          {this.props.debitsHistory.map((debit) => (
            <li key={debit.id}>
              Description: {debit.description} <br></br> Amount: {debit.amount}
              <br></br> Date: {debit.date}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Debit;
