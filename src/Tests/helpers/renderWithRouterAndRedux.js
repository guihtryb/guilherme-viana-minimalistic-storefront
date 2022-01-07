import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducers from '../../Redux/reducers/index';
import { ApolloProvider} from 'react-apollo';
import apolloClient from '../../Services/apollo';

const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},
    store = createStore(rootReducers, initialState),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        <ApolloProvider client={ apolloClient }>
          {component}
        </ApolloProvider>
      </Provider>
    </Router>,
  ),
  history,
  store,
});

export default renderWithRouterAndRedux;
