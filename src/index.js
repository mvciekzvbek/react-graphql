import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient, {gql} from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


const client = new ApolloClient({uri: 'http://localhost:3000/graphql'});

// const query = gql`
//     {
//         totalUsers
//         totalArticles        
//     }`;

// console.log('cache', client.extract());
// client.query({query})
//     .then(({data}) => {
//         console.log('data', data);
//     })
//     .catch((e) => {
//         console.error(e)
//     });

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)