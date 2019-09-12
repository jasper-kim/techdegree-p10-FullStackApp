import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    cancel = (event) => {
        event.preventDefault(); 
        this.props.history.push('/');
    }

    submit = (event) => {
        //call context signin method and get user
        //if user is null set error state with unsuceesfull message
        //if user is exist send a user to this.props.location.state.from or '/'
        event.preventDefault();
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;
        context.actions.signIn(emailAddress, password)
            .then(user => {
                if(user === null) {
                    this.setState({
                        errors: ["Sign-in was unsuccessfull!"],
                    });
                } else {
                    this.props.history.push(from);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error');
            });;
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
                    <form onSubmit={this.submit}>
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
                            <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
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