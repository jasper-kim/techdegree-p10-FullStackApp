import React, { Component } from 'react';

//Imports components
import Header from './Components/Header';
import Courses from './Components/Courses';

function App() {
  const url = 'http://localhost:5000/api/courses';
  const courses = new Array();
  
  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.map(d => {courses.push(d)});
      console.log(courses);
    });
  

  return (
    <div className="App">
      <Header />
      <Courses />
    </div>
  );
}

export default App;
