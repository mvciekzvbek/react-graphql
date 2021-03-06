import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArticlesListItem from './ArticleListItem';

const CATEGORY_QUERY = gql`
    query category($filter: CategoryFilter) {   
        allCategories(filter: $filter) {
          hits {
            name
            thumbnail
            articles {
                id
                url
                title,
                image_url,
                author {
                    githubLogin,
                }
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
  },
  image: {
    maxWidth: '100%',
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

const Category = (props) => {
  const classes = useStyles();

  const filter = {
    filter: {
      name: props.match.params.id
    },
  };

  return (
    <Container className={classes.container}>
      <Query query={CATEGORY_QUERY} variables={filter}>
        {({ loading, data }) => (loading
          ? <p>Loading...</p>
          : (
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <div className={classes.infoWrapper}>
                  <div className={classes.imageWrapper}>
                    <img className={classes.image} src={data.allCategories.hits[0].thumbnail} />
                  </div>
                  <div className={classes.userInfo}>
                    <h1>{data.allCategories.hits[0].name}</h1>
                    {/* <p>Login: {data.allUsers[0].githubLogin}</p> */}
                    <p>
                      Articles: {data.allCategories.hits[0].articles.length}
                    </p>
                  </div>
                </div>
                <div className={classes.articlesWrapper}>
                  <Grid container spacing={3} className={classes.gridContainer}>
                    {data.allCategories.hits[0].articles.map(article => (
                      <Grid item sm={4} xs={12} key={article.id} className={classes.gridItem}>
                        <ArticlesListItem data={article} />
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

export default Category;
