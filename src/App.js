import React, {Component, Fragment} from 'react';
import Users from './Users';
import Articles from './Articles';
import PostArticle from './postArticle'
import { gql } from 'apollo-boost';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthorizedUser from './AuthorizedUser';
import { withApollo } from 'react-apollo';

export const ROOT_QUERY = gql`
    query allUsers {   
        totalUsers
        totalArticles
        allUsers { ...userInfo }
        me { ...userInfo }
        allArticles {
            id
            title
            lead
            url
            imageUrl
            categories
            postedBy {
                githubLogin
            }
            created
        }
    }

    fragment userInfo on User {
      githubLogin 
      name
      avatar
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
            categories
            postedBy {
                githubLogin
            }
            created
        }
    }
`

class App extends Component {
    componentDidMount () {
        console.log(this.props)
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
                const data = client.readQuery({query: ROOT_QUERY}) 
                data.totalUsers += 1
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
                data.totalPhotos += 1
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
                <Switch>
                    <Route exact path="/" component={() =>
                        <Fragment>
                            <AuthorizedUser />
                            <Users />
                            <Articles />
                        </Fragment>
                    } />
                    <Route path="/new" component={PostArticle} />
                    <Route component={({ location }) => <h1>"{location.pathname}" not found</h1>} />
                </Switch>
            </BrowserRouter>  
        )
    }
}

export default withApollo(App);
