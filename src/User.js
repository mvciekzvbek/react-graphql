import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Container from '@material-ui/core/Container';

const USER_QUERY = gql`
    query article($filter: UserFilter) {   
        allUsers(filter: $filter) {
            name
            githubLogin
            avatar
            articles {
                url
                title,
                imageUrl
            }
        }
    }
`

const useStyles = makeStyles({
    container: {
        paddingTop: "32px",
        paddingBottom: "32px"
    },
    paper: {
        padding: "32px"
    },
});

const User = (props) => {
    const classes = useStyles();

    console.log(props.match.params.id);

    const filter = {
        "filter": {
            "id": parseInt(props.match.params.id, 10)
        }  
    }

    console.log(filter);

    return (
        <Container className={classes.container}>
            <Query query={USER_QUERY} variables={filter}> 
                    {({loading, data}) => loading ? 
                        <p>Loading...</p> :
                        <div className={classes.root}>
                            <Paper className={classes.paper}>
                            </Paper>                           
                        </div>
                    }
            </Query>
        </Container>
    )
}

export default User;