import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


//Imports components
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import NotFound from './Components/NotFound';

import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Switch>
          <Route exact path='/' component={Courses} />
          <Route exact path='/courses/create' component={CreateCourse} />
          <Route exact path='/courses/:id/update' component={UpdateCourse} />
          <Route path='/courses/:id' component={CourseDetail} /> 
          <Route path='/signin' component={UserSignIn} /> 
          <Route path='/signup' component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOut} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
