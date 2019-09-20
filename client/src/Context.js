import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {
  constructor() {
      super();
      this.data = new Data();
  }
  
  //Set globla states to create Authorization header 
  //on future REST API request that require authentication
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    userPassword: Cookies.getJSON('userPassword') || null,
  };

  render() {
    const { authenticatedUser, userPassword } = this.state;
    const value = {
      authenticatedUser,
      userPassword,
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

      // Set cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      Cookies.set('userPassword', JSON.stringify(password), { expires: 1 });
    }
    return user;
  }

  signOut = async () => {
    this.setState({
        authenticatedUser: null,
      });

      // Remove cookie
      Cookies.remove('authenticatedUser');
      Cookies.remove('userPassword');
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