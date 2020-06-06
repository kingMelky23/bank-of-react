import React, { Component } from "react";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Home from './Components/Home';
import UserProfile from './Components/UserProfile';

class App extends Component {
  constructor() {
    super()
  
    this.state = {
       accountBalance: 14568.27,
       currentUser: {
         userName: 'bob_loblaw',
         memberSince: '08/23/99',
       }
       
    }
  }
  
  render() {
    const HomeComponent = () => (<Home accountBalance = {this.state.accountBalance}/>);
    const UserProfileComponenet = () => (<UserProfile userName={this.state.currentUser.userName} memberSince ={this.state.currentUser.memberSince}/>)
    return (
      <Router>
        <Switch>
         <Route exact path="/" render= {HomeComponent}/>
         <Route exact path="/userProfile" render={UserProfileComponenet}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
