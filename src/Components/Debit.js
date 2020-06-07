import React, { Component } from "react";
import Axios from "axios";

class Debit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      debitArr: [],
      debitTotal: 0,
      description: "",
      amount: 0,
      date: "",
    };
  }

  handleChange(event) {}

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
    return (
      <div>
        <h1>Debits</h1>
        <br></br>
        <h2>Total debit: ${this.state.debitTotal}</h2>
        <h4>Add transaction</h4>
        <label for="description">Description:</label>
        <input
          type="text"
          name="description"
          value={this.state.debitArr.description}
          onChange={this.handleChange}
        />
        <br></br>
        <label for="amount">Amount:</label>
        <input
          type="text"
          name="amount"
          value={this.state.debitArr.amount}
          onChange={this.handleChange}
        />
        <br></br>
        <label for="date">Date:</label>
        <input
          type="text"
          name="date"
          value={this.state.debitArr.date}
          onChange={this.handleChange}
        />
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
