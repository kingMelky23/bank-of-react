import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class UserProfile extends Component {
    render() {
        return (
            <div>
                <h1>User Profile</h1>
                <ul>                              
                    <li>Username: {this.props.userName}</li>
                    <li>Member Since: {this.props.memberSince}</li>
                    <Link to= "/">Home</Link>
                </ul>
            </div>
        );
    }
}

export default UserProfile
