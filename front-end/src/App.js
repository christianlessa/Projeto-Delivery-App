import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ () => <Redirect to="/login" /> } />
      <Route exact path="/login" component={ null } />
    </Switch>
  );
}

export default App;
