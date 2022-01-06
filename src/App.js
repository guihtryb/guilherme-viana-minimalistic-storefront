import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Cart from './Pages/Cart';
import Details from './Pages/Details';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';

import './App.css';
import { ApolloProvider} from 'react-apollo';
import apolloClient from './Services/apollo';

// Tests
// Final refactor


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={apolloClient}>
          <div className='app'>
            <Switch>
              <Route exact path="/" component={ Home }/>
              <Route exact path="/cart" component={ Cart }/>
              <Route exact path="/details/:category/:id" render={(props) => <Details {...props} /> }/>
              <Route component={ NotFound }/>
            </Switch>
          </div>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;