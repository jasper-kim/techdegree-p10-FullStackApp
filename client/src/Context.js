import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {
    constructor() {
        super();
        this.data = new Data();   
    }
    
    state = {
      authenticatedUser: null,
      userPassword: null,
    };

    render() {
        const value = {
            data: this.data,
            actions: {
              signIn: this.signIn,
              signOut: this.signOut,
            }
        }

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    signIn = async (emailAddress, password) => {
      const user = await this.data.getUser(emailAddress, password);
      if (user !== null) {
        this.setState({
          authenticatedUser: user,
          userPassword: password,
        });
      }
      return user;
    }

    signOut = async () => {
      this.setState({
         authenticatedUser: null,
         userPassword: null,
        });
    }
}

export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }