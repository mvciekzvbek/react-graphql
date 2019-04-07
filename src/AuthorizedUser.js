import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation} from 'react-apollo';
import { gql } from 'apollo-boost';
import { ROOT_QUERY } from './App';

const GITHUB_AUTH_MUTATION = gql`
    mutation githubAuth($code: String!) {
        githubAuth(code: $code) {
            token
        }
    }
`

class AuthorizedUser extends React.Component {
    state = {
        signingIn: false
    }

    authorizationComplete = (cache, {data}) => {
        localStorage.setItem('token', data.githubAuth.token);
        this.props.history.replace('/');
        this.setState({ signingIn: false })
    }

    componentDidMount() {
        if( window.location.search.match(/code=/)) {
            this.setState({signingIn: true});
            const code = window.location.search.replace("?code=", "");
            this.githubAuthMutation({variables: {code}})
        }
    }

    requestCode() {
        var clientID = "3d68acc66b2cb10108f6";
        window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`
    }

    render() {
        return (
            <Mutation
                mutation={GITHUB_AUTH_MUTATION}
                update={this.authorizationComplete}
                refetchQueries={[{query: ROOT_QUERY}]}>
                {mutation => {
                    this.githubAuthMutation = mutation;
                    return (
                        <Me
                            signingIn={this.state.signingIn}
                            requestCode={this.requestCode}
                            logout={()=>{localStorage.removeItem('token')}}/>
                        // <button 
                        //     onClick={this.requestCode} 
                        //     disabled={this.state.signingIn}>
                        //     Sign in with GitHub
                        // </button>
                    )
                }}
            </Mutation>
        )
    }
}

const Me = ({ logout, requestCode, signingIn }) => 
    <Query query={ROOT_QUERY}>
        {({ loading, data }) => data.me ?
            <CurrentUser {...data.me} logout={logout} /> :
            loading ? 
                <p>Loading...</p> :
                <button
                    onClick={requestCode}
                    disabled={signingIn}>
                    Sign in with GitHub
                </button>
        } 
    </Query>


const CurrentUser = ({ name, avatar, logout }) => {
    return (
        <div>
            <img src={avatar} width={48} height={48} alt="" />
            <h1>{name}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
export default AuthorizedUser;