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
      hits {
        name
        githubLogin
        avatar_url
        articles {
          id
          url
          title,
          image_url
        }
      }
      
    }
  }
`;

const useStyles = makeStyles({
  container: {
    paddingTop: '32px',
    paddingBottom: '32px',
    maxWidth: '1200px'
  },
  paper: {
    padding: '32px',
  },
  infoWrapper: {
    position: 'relative',
  },
  imageWrapper: {
    width: '33%',
    display: 'inline-block',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    minHeight: '300px'
  },
  image: {
    maxWidth: '100%',
    minWidth: '380px'
  },
  userInfo: {
    width: '66%',
    display: 'inline-block',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    paddingLeft: '10%',
  },
  gridContainer: {
    margin: '32px 0',
  },
});

const User = (props) => {
  const classes = useStyles();

  const filter = {
    filter: {
      username: props.match.params.id,
    },
  };

  return (
    <Container className={classes.container}>
      <Query query={USER_QUERY} variables={filter}>
        {({ loading, data }) => (loading
          ? <p>Loading...</p>
          : (
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <div className={classes.infoWrapper}>
                  <div className={classes.imageWrapper} style={{ backgroundImage: `url(${data.allUsers.hits[0]["avatar_url"]})` }}>
                    {/* <img className={classes.image} src={data.allUsers.hits[0]["avatar_url"]} /> */}
                  </div>
                  <div className={classes.userInfo}>
                    <p>
                      Username: {data.allUsers.hits[0].name}
                    </p>
                    <p>
                      Login: {data.allUsers.hits[0].githubLogin}
                    </p>
                    <p> 
                      Articles: {data.allUsers.hits[0].articles.length}
                    </p>
                  </div>
                </div>
                <div className={classes.articlesWrapper}>
                  <Grid container spacing={3} className={classes.gridContainer}>
                    {data.allUsers.hits[0].articles.map(article => (
                      <Grid item sm={4} xs={12} key={article.id} className={classes.gridItem}>
                        <ArticlesListItem data={article} author={data.allUsers.hits[0]} />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </Paper>
            </div>
          ))
                    }
      </Query>
    </Container>
  );
};

export default User;
