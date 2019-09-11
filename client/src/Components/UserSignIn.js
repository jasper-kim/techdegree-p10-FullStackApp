import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    handleClick = (event) => {
        event.preventDefault(); 
        this.props.history.push('/');
    }

    change = (event) => {
        const {target: { name, value }} = event;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }

    render() {
        const {
            emailAddress,
            password,
            errors,
        } = this.state

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    <form>
                        <div>
                            <input 
                                id="emailAddress" 
                                name="emailAddress" 
                                type="text" className="" 
                                placeholder="Email Address" 
                                value={emailAddress}
                                onChange={this.change} />
                        </div>
                        <div>
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                className="" 
                                placeholder="Password" 
                                value={password}
                                onChange={this.change} />
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Sign In</button>
                            <button className="button button-secondary" onClick={this.handleClick}>Cancel</button>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }
}