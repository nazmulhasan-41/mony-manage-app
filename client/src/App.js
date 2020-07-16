import React from 'react';

import './App.css';
import {BrowserRouter,Route,Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './pages/NavBar';

import Dashboard from './pages/Dashboard';

import history from './pages/history';
import Gift from './pages/Gift';


function App() {
  return (
    <BrowserRouter histo={history}>

    <NavBar histo={history}/>
    <div className="container">

      
      <Switch  >
        <Route path='/' exact component={Home}></Route>
        <Route path='/login'  component={Login}></Route>
        <Route path='/register'  component={Register}></Route>
        <Route path='/dashboard'  component={Dashboard}></Route>
        <Route path='/gift'  component={Gift}></Route>
        <Route path='/navbar' component={NavBar}></Route>
        

      </Switch>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
