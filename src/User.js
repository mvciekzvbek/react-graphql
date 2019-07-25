import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArticlesListItem from './ArticleListItem';

const USER_QUERY = gql`
    query user($filter: UserFilter) {   
        allUsers(filter: $filter) {
            name
            githubLogin
            avatar
            articles {
                id
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
        padding: "32px",
    },
    infoWrapper: {
        position: "relative"
    },
    imageWrapper: {
        width: "33%",
        display: "inline-block"
    },
    image: {
        maxWidth: "100%",
    },
    userInfo: {
        width: "66%",
        display: "inline-block",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        paddingLeft: '10%'
    },
    gridContainer: {
        margin: "32px 0"
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
                                {console.log(data)}
                                <div className={classes.infoWrapper}>
                                    <div className={classes.imageWrapper}>
                                        <img className={classes.image} src={data.allUsers[0].avatar}/>
                                    </div>
                                    <div className={classes.userInfo}>
                                        <p>Username: {data.allUsers[0].name}</p>
                                        <p>Login: {data.allUsers[0].githubLogin}</p>
                                        <p>Articles: {data.allUsers[0].articles.length}</p>
                                    </div>
                                </div>
                                <div className={classes.articlesWrapper}>
                                    <Grid container spacing={3} className={classes.gridContainer}>
                                        {data.allUsers[0].articles.map(article => 
                                            <Grid item sm={4} xs={12} key={article.id} className={classes.gridItem}>
                                                <ArticlesListItem data={article} author={data.allUsers[0]} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </div>
                            </Paper>                           
                        </div>
                    }
            </Query>
        </Container>
    )
}

export default User;