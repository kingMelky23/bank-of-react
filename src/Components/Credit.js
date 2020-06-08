import React, { Component } from "react";
import Axios from "axios";

class Credit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creditArr: [],
      creditTotal: 0,
      description: "",
      amount: 0,
      date: "",
      obj:{},
    };  
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addTransaction=()=>{
    console.log("debugging",this.state.creditArr)
    const description = this.state.description;
    const amount = this.state.amount;
    const date =this.state.date;
    const id = (Math.random() * 300).toString();
    const obj = {'id':id, 'description': description, 'amount':amount, 'date':date }
    const newCredit = [obj,...this.state.creditArr]
    this.setState({creditArr : newCredit})
    
  }

  componentDidMount() {
    Axios
      // credit
      .get("https://moj-api.herokuapp.com/credits")
      .then((response) => {
        const data = response.data;
        this.setState({ creditArr: data });
        console.log(response);

        let creditTotal = 0;
        for (let price of data) {
          creditTotal += price.amount;
        }
        this.setState({ creditTotal });
      })

      .catch((err) => {
        console.log(err);
        this.setState({ creditArr: [] });
      });
  }


  render() {
    return (
      <div>
        <h1>credits</h1>
        <br></br>
        <h2>Total credit: ${this.state.creditTotal}</h2>
        <h4>Add transaction</h4>
        <form >
          <label /*for="description"*/>Description:</label>
          <input
            type="text"
            name="description"
            value={this.state.creditArr.description}
            onChange={this.handleChange}
          />
          <br></br>
          <label /*for="amount"*/>Amount:</label>
          <input
            type="text"
            name="amount"
            value={this.state.creditArr.amount}
            onChange={this.handleChange}
          />
          <br></br>
          <label /*for="date"*/>Date:</label>
          <input
            type="text"
            name="date"
            value={this.state.creditArr.date}
            onChange={this.handleChange}
          />
          <br></br>
          <button type="button" onClick={this.addTransaction} >Submit</button>
        </form>
        <ul>
          {this.state.creditArr.map((credit) => (
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