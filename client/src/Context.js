import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {
  constructor() {
      super();
      this.data = new Data();
      this.password = '';
  }
  
  state = {
    authenticatedUser: null,
  };

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        getPassword: this.getPassword,
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
      });

      this.password = password;
    }
    return user;
  }

  signOut = async () => {
    this.setState({
        authenticatedUser: null,
      });

      this.password = '';
  }

  getPassword = () => {
    return this.password;
  }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}