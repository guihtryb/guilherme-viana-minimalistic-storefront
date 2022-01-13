import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from './Pages/Cart';
import Details from './Pages/Details';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';

import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home }/>
        <Route exact path="/cart" component={ Cart }/>
        <Route exact path="/details/:category/:id" render={(props) => <Details {...props} /> }/>
        <Route component={ NotFound }/>
      </Switch>
    );
  }
}

export default App;