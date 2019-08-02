import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  split,
} from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { persistCache } from 'apollo-cache-persist';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import App from './App';

import * as serviceWorker from './serviceWorker';

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/**
 * 1. Create instance of cache from apollo-boost
 * 2. Save data in localStorage
 *
 * Once we start our application, we should see the value of aour cache saved to our store
 *
 */
const cache = new InMemoryCache();
persistCache({
  cache,
  storage: localStorage,
});

/**
 * Check localStorage on startup to see if we already have a cache saved
 * If we do, we want to initialize our local cache with that data before creating the client
 *
 * Because of that, our application will load any cached data before it starts.
 * If we do have data saved under the apollo-cache-persist key, we will use the cache.restore method
 * to add it to our cache instance
 */
if (localStorage['apollo-cache-persist']) {
  const cacheData = JSON.parse(localStorage['apollo-cache-persist']);
  cache.restore(cacheData);
}

/**
 * used to send http requests
 */
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

/**
 * httpLink is concatenated to the authLink to handle user authorization for HTTP requests
 * When operation is sent to this link, it will first be passed to the authLink where the
 * authorizationn header is added to the operation before it is forwarded to the httpLink
 * to handle network request.
 *
 * Like express middleware.
 */
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(context => ({
    headers: {
      ...context.headers,
      authorization: localStorage.getItem('token'),
    },
  }));
  return forward(operation);
});

const httpAuthLink = authLink.concat(httpLink);

/**
 * used to send data over web sockets
 */
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: { reconnect: true },
});

/**
 * split returns one of two Apollo Links based upon a predicate.
 * The first argument is function that returns a boolean.
 * The second argument represents the link to return when the predicate returns true
 * The third argument represents the link to return when the predicate returns false
 */
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpAuthLink,
);

const client = new ApolloClient({
  cache,
  // uri: 'http://localhost:3000/graphql',
  // request: operation => {
  //     operation.setContext(context => ({
  //         headers: {
  //             ...context.headers,
  //             authorization: localStorage.getItem('token')
  //         }
  //     }))
  // }
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
