import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {

    return (
        <div className="header">
            <div className="bounds">
            <Link to='/'><h1 className="header--logo">Courses</h1></Link>
            <nav>
                <Link className='signup' to='/signup'>Sign Up</Link>
                <Link className='signin' to='/signin'>Sign In</Link>
                {/* <span>Welcome, {authUser.name}!</span>
                <Link to="/signout">Sign Out</Link> */}
            </nav>
            </div>
        </div>
    );
  }
};
