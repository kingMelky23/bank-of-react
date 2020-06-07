import React, { Component } from "react";
import Axios from "axios";

class Credit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creditArr: [],
      creditTotal: 0,
    };
  }
  componentDidMount() {
    Axios
      // credit
      .get("https://moj-api.herokuapp.com/credits")
      .then((respone) => {
        const data = respone.data;
        this.setState({ creditArr: data });
        console.log(respone);

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
        <h1>Credits</h1>
        <h2>Total Credit: ${this.state.creditTotal}</h2>
        <h4>Add transaction</h4>
        <label for="description">Description:</label>
        <input
          type="text"
          name="description"
          value={this.state.creditArr.description}
          onChange={this.handleChange}
        />
        <br></br>
        <label for="amount">Amount:</label>
        <input
          type="text"
          name="amount"
          value={this.state.creditArr.amount}
          onChange={this.handleChange}
        />
        <br></br>
        <label for="date">Date:</label>
        <input
          type="text"
          name="date"
          value={this.state.creditArr.date}
          onChange={this.handleChange}
        />
        <div>
          <ul>
            {this.state.creditArr.map((credit) => (
              <li key={credit.id}>
                Description: {credit.description} <br></br> Amount:{" "}
                {credit.amount}
                <br></br> Date: {credit.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Credit;
