import React, {Component} from 'react';
import './App.css'
import Navigation from './Navigation';
import Users from './Users';
import User from './User';
import Articles from './Articles';
import Article from './Article';
import Categories from './Categories';
import Category from './Category';
import PostArticle from './postArticle'
import { gql } from 'apollo-boost';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        paddingTop: "32px"
    }
  });

export const ROOT_QUERY = gql`
    query allUsers {   
        # usersCount
        # articlesCount
        allUsers { ...userInfo }
        me { ...userInfo }
        allArticles {
            id
            title
            # lead
            url
            imageUrl
            categories {
                name
            }
            authors {
                githubLogin
            }
            # created
        }
    }

    fragment userInfo on User {
      githubLogin 
      name
      avatar,
      id
    }
`

const LISTEN_FOR_USERS = gql`
    subscription {
        newUser {
            githubLogin,
            name,
            avatar
        }
    }
`

const LISTEN_FOR_ARTICLES = gql`
    subscription {
        newArticle {
            id
            title
            lead
            url
            imageUrl
            categories {
                name
            }
            authors {
                githubLogin
            }
            created
        }
    }
`

class App extends Component {
    componentDidMount () {
        let {client} = this.props;

        /**
         * 1. First subscribe is used to send subscription operation to service. It returns an observer objcect. 
         * 
         * 2. Second subscribe function is a method of the observer object. It is used to subscribe handlers to 
         * the observer. The handlers are invoked every time the subscription pushes data to the client. In this case
         * there is handler that captures information about each new user and adds them directly to the ApolloCache
         * using writeQuery.
         */
        this.listenForUsers = client
            .subscribe({query: LISTEN_FOR_USERS})
            .subscribe(({data: { newUser } }) => {
                const data = client.readQuery({ query: ROOT_QUERY }) 
                data.usersCount += 1
                data.allUsers = [
                    ...data.allUsers,
                    newUser
                ]
                client.writeQuery({query: ROOT_QUERY, data})
            })

        this.listenForArticles = client
            .subscribe({ query: LISTEN_FOR_ARTICLES })
            .subscribe(({ data:{ newArticle } }) => {
                const data = client.readQuery({ query: ROOT_QUERY })
                data.articlesCount += 1
                data.allArticles = [
                    ...data.allArticles,
                    newArticle
                ]
                client.writeQuery({ query: ROOT_QUERY, data })
            })     
    }

    componentWillUnmount () {
        this.listenForUsers.unsubscribe();
        this.listenForArticles.unsubscribe();
    }

    render() {
        return (
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route component={Articles} exact path="/" />
                    <Route component={PostArticle} path="/new"/>
                    <Route component={Article} path="/articles/:id"  />
                    <Route component={Users} exact path="/users" />
                    <Route component={User} path="/users/:id" />
                    <Route component={Categories} exact path="/categories" />
                    <Route component={Category} path="/categories/:id" />
                    <Route component={({ location }) => <h1>"{location.pathname}" not found</h1>} />
                </Switch>
            </BrowserRouter>  
        )
    }
}

export default withApollo(withStyles(styles)(App));
