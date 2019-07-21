import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Query, Mutation, withApollo, compose } from 'react-apollo';
import { gql } from 'apollo-boost';
import { ROOT_QUERY } from './App';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const GITHUB_AUTH_MUTATION = gql`
    mutation githubAuth($code: String!) {
        githubAuth(code: $code) {
            token
        }
    }
`

const useStyles = makeStyles(theme => ({
  	link: {
		textDecoration: "none"
	},
    button: {
      color: "white"
    },
    avatar: {
        width: "35px",
        height: "35px",
        borderRadius: '50%'
    }
  }));
  

class AuthorizedUser extends React.Component {
    state = {
        signingIn: false
    }

    // constructor(props) {
    //     super(props)
    // }

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

    /**
     * 1. Removes token from localStorage
     * 2. Clears me field from current user saved in cache
     * 3. Write query without user data => display "Sign in with Github" without refreshing the browser
     */
    logout = () => {
        localStorage.removeItem('token');
        let data = this.props.client.readQuery({query: ROOT_QUERY, variables: {filter:{}, page:{}, sort:{}}});
        data.me = null;
        this.props.client.writeQuery({query: ROOT_QUERY, data, variables: {filter:{}, page:{}, sort:{}}});
    }

    render() {
        return (
            <Mutation
                mutation={GITHUB_AUTH_MUTATION}
                update={this.authorizationComplete}
                refetchQueries={[{
                    query: ROOT_QUERY, 
                    variables: {filter:{}, page:{}, sort:{}}
                }]}>
                {mutation => {
                    this.githubAuthMutation = mutation;
                    return (
                        <Me
                          signingIn={this.state.signingIn}
                          requestCode={this.requestCode}
                          logout={this.logout} />
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

const Me = ({ logout, requestCode, signingIn }) =>  {
    const classes = useStyles();

    return <Query 
        query={ROOT_QUERY}
        variables={{filter: {}, page:{}, sort:{}}}> 
        {({ loading, data }) =>  data && data.me ?
            <CurrentUser {...data.me} logout={logout} /> :
            loading ? 
                <p>Loading...</p> :
                <Button
                    className={classes.button}
                    // variant="contained"
                    onClick={requestCode}
                    disabled={signingIn}>
                    Sign in with GitHub
                </Button>


        } 
    </Query>
}

const CurrentUser = ({ name, avatar, logout }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
      setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
      setAnchorEl(null);
    }

    return (
        <div>
            <Link className={classes.link} to="/users">
                <Button className={classes.button}>Users</Button>
            </Link>
            <Link className={classes.link} to="/new">
                <Button className={classes.button}>New</Button>
            </Link>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <img className={classes.avatar} src={avatar} alt="" />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>{name}</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
        )
}
export default compose(withApollo, withRouter)(AuthorizedUser);