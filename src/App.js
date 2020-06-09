import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import UserProfile from "./Components/UserProfile";
import LogIn from "./Components/LogIn";
import Debit from "./Components/Debit";
import Credit from "./Components/Credit";

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99",
        debitArr: [],
        creditArr: [],
        debitBalance:0,
        creditBalance: 0,
      },
    };
  }

  updatedebitBalance = () =>{
    this.setState({debitBalance : this.state.debitBalance})
    console.log(this.state.debitBalance)
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

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
        debitArrOfObj={this.state.debitArr}
        debitAmount = {this.updatedebitBalance}

      />
    );
    const CreditComponent = () => (
      <Credit
        creditArrOfObj={this.state.creditArr}
        creditAmount = {this.state.creditBalance}
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
