import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Cart from './Pages/Cart';
import Details from './Pages/Details';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className='app'>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route exact path="/cart" component={ Cart }/>
          <Route exact path="/details/:id" render={ (props) => <Details {...props} /> } />
          <Route component={ NotFound }/>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;