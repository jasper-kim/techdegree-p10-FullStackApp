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
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        createCourse: this.createCourse,
        updateCourse: this.updateCourse,
        deleteCourse: this.deleteCourse,
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

  createCourse = async (body) => {
    const url = 'http://localhost:5000/api/courses';
    const { emailAddress } = this.state.authenticatedUser;
    const password = this.state.userPassword;
    const response = await this.data.api(url, 'POST', body, true, {emailAddress, password});
    if (response.status === 201) {
      const location = response.headers.get('Location');
      const id = location.replace('/api/courses/', '');
      return id;
    } else if (response.status === 400) {
        return response.json().then(data => data);
    } else {
        throw new Error();
    }
  }

  updateCourse = async (body, id) => {
    const url = `http://localhost:5000/api/courses/${id}`;
    const { emailAddress } = this.state.authenticatedUser;
    const password = this.state.userPassword;
    const response = await this.data.api(url, 'PUT', body, true, {emailAddress, password});
    if (response.status === 204) {
      return id;
    } else if (response.status >= 400) {
        return response.json().then(data => data);
    } else {
        throw new Error();
    }
  }

  deleteCourse = async (id) => {
    const url = `http://localhost:5000/api/courses/${id}`;
    const { emailAddress } = this.state.authenticatedUser;
    const password = this.state.userPassword;
    const response = await this.data.api(url, 'DELETE', null, true, {emailAddress, password});
    if (response.status === 204) {
      return '/';
    } else if (response.status >= 400) {
        return response.json().then(data => data);
    } else {
        throw new Error();
    }
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