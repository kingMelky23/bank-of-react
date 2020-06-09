import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import UserProfile from "./Components/UserProfile";
import LogIn from "./Components/LogIn";
import Debit from "./Components/Debit";
import Credit from "./Components/Credit";
import Axios from "axios";


class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99",
       },
       debits: [],
       debitBalance: 0,
       credits: [],
       creditBalance:0
    };
  }

  componentDidMount() {
    Axios
      // debit
      .get("https://moj-api.herokuapp.com/debits")
      .then((response) => {
        const data = response.data;
        this.setState({ debits: data });
        console.log(response);

        let debitBalance = 0;
        for (let price of data) {
          debitBalance += price.amount;
        }
        this.setState({ debitBalance });
      })

      .catch((err) => {
        console.log(err);
        this.setState({ debitArr: [] });
      });
 
    Axios
      // credit
      .get("https://moj-api.herokuapp.com/credits")
      .then((response) => {
        const data = response.data;
        this.setState({ credits: data });
        console.log(response);

        let creditBalance = 0;
        for (let price of data) {
          creditBalance += price.amount;
        }
        this.setState({ creditBalance });
      })

      .catch((err) => {
        console.log(err);
        this.setState({ credits: [] });
      });
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };
  

  addToDebitHistory = (debit) =>{
    let date = new Date();
    debit.date = date.toISOString().substring(0,10);
    const id = (Math.random() * 300);
    debit.id = id
    let newDebit = [debit,...this.state.debits];
    this.setState({debits: newDebit});
    this.setState({debitBalance: parseFloat(debit.amount)+ this.state.debitBalance })
    this.setState({accountBalance: this.state.accountBalance- parseInt(debit.amount)});
  }

  addToCreditHistory = (credit) =>{
    let date = new Date();
    credit.date = date.toISOString().substring(0,10);
    const id = (Math.random() * 300);
    credit.id = id
    let newcredit = [credit,...this.state.credits];
    this.setState({credits: newcredit});
    this.setState({creditBalance: parseFloat(credit.amount)+ this.state.creditBalance })
    this.setState({accountBalance: this.state.accountBalance+ parseInt(credit.amount)});
  }
  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponenet = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
        {...this.props}
      />
    );
    const DebitComponent = () => (
      <Debit
          debitsHistory ={this.state.debits}
          accountBalance = {this.state.accountBalance}
          debitBalance = {this.state.debitBalance}
          addToDebitHistory= {this.addToDebitHistory}
      />
    );
    const CreditComponent = () => (
      <Credit
        creditsHistory ={this.state.credits}
        accountBalance = {this.state.accountBalance}
        creditBalance = {this.state.creditBalance}
        addToCreditHistory= {this.addToCreditHistory}
        />
    );
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponenet} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/Credits" render={CreditComponent} />
          <Route exact path="/Debits" render={DebitComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;

