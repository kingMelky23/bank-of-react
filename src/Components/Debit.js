import React, { Component } from "react";
import Axios from "axios";

class Debit extends Component {
  constructor(props) {
    super(props);

    this.state = {    
      obj:{
        description: "",
        amount: 0,
        date: "",
      },
    };
    this.handleTransaction = this.handleTransaction.bind(this)
  }

  handleTransaction(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  

  addTransaction=()=>{
    //console.log("debugging",this.state.debitArr)
    const description = this.state.description;
    const amount = this.state.amount;
    const date =this.state.date;
    const id = (Math.random() * 300).toString();
    const obj = {'id':id, 'description': description, 'amount':amount, 'date':date }
    const newDebit = [obj,...this.state.debitArr]
    this.setState({debitArr : newDebit})
    // const newAmount = this.state.debitTotal + amount
    this.setState({ debitTotal: parseFloat(amount) + this.state.debitTotal});
      
  }


  componentDidMount() {
    Axios
      // debit
      .get("https://moj-api.herokuapp.com/debits")
      .then((response) => {
        const data = response.data;
        this.setState({ debitArr: data });
        console.log(response);

        let debitTotal = 0;
        for (let price of data) {
          debitTotal += price.amount;
        }
        this.setState({ debitTotal });
      })

      .catch((err) => {
        console.log(err);
        this.setState({ debitArr: [] });
      });
  }


  render() {
    const {updatedebitBalance} = this.props
    return (
      <div>
        <h1>Debits</h1>
        <br></br>
        <h2 >Total debit: ${this.state.debitTotal}</h2>
        <h4>Add transaction</h4>
        <form >
          <label /*for="description"*/>Description:</label>
          <input
            type="text"
            name="description"
            value={this.state.debitArr.description}
            onChange={this.handleTransaction} 
          />
          <br></br>
          <label /*for="amount"*/>Amount:</label>
          <input
            type="text"
            name="amount"
            value={this.state.debitArr.amount}
            onChange={this.handleTransaction}
          />
          <br></br>
          <label /*for="date"*/>Date:</label>
          <input
            type="text"
            name="date"
            value={this.state.debitArr.date}
            onChange={this.handleTransaction}
          />
          <br></br>
          <button type="button" onClick={this.addTransaction} >Submit</button>
        </form>
        <ul>
          {this.state.debitArr.map((debit) => (
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
