import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorDisplay from './ErrorDisplay';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
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
                    <ErrorDisplay errors={errors}/>
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

    cancel = (event) => {
        event.preventDefault(); 
        this.props.history.push('/');
    }

    submit = (event) => {
        event.preventDefault();
        const { context } = this.props;
        const { from } = this.props.location.state || '';
        const { emailAddress, password } = this.state;

        // client side validation check
        if(!emailAddress) {
            this.setState({
                errors: ['Please provide "email address".'],
            });
        } else if(!password) {
            this.setState({
                errors: ['Please provide "password".'],
            });
        } else {
            context.actions.signIn(emailAddress, password)
                .then(user => {
                    if(user === null) {
                        this.setState({
                            errors: ["Sign-in was unsuccessfull!", "Please check your email or password."],
                        });
                    } else {
                        from ? this.props.history.push(from) : this.props.history.goBack()
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.props.history.push('/error');
                });
        }
    }

    change = (event) => {
        const {target: { name, value }} = event;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    }
}