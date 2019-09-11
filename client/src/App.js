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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Switch>
          <Route exact path='/' component={Courses} />
          <Route path='/courses/:id' component={CourseDetail} /> 
          <Route path='/signin' component={UserSignIn} /> 
          <Route path='/signup' component={UserSignUp} /> 
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
