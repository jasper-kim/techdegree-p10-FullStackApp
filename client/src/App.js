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
import Forbidden from './Components/Forbidden';
import UnhandledError from './Components/UnhandledError';

//Import Higher-Order Component
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

//Subscribe to Context API
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const CoursesWithContext = withContext(Courses);

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderWithContext />
        
        {/* Set up Routes */}
        <Switch>
          <Route exact path='/' component={CoursesWithContext} />
          <PrivateRoute path='/courses/create' component={CreateCourseWithContext} />
          <PrivateRoute path='/courses/:id/update' component={UpdateCourseWithContext} />
          <Route path='/courses/:id' component={CourseDetailWithContext} /> 
          <Route path='/signin' component={UserSignInWithContext} /> 
          <Route path='/signup' component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/error" component={UnhandledError} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
