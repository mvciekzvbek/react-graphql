import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { persistCache } from 'apollo-cache-persist';

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
    storage: localStorage
})

/**
 * Check localStorage on startup to see if we already have a cache saved
 * If we do, we want to initialize our local cache with that data before creating the client
 * 
 * Because of that, our application will load any cached data before it starts. 
 * If we do have data saved under the apollo-cache-persist key, we will use the cache.restore method
 * to add it to our cache instance
 */
if (localStorage['apollo-cache-persist']) {
    let cacheData = JSON.parse(localStorage['apollo-cache-persist']);
    cache.restore(cacheData);
}

const client = new ApolloClient({
    cache,
    uri: 'http://localhost:3000/graphql',
    request: operation => {
        operation.setContext(context => ({
            headers: {
                ...context.headers,
                authorization: localStorage.getItem('token')
            }
        }))
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)