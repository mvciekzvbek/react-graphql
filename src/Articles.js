import React, { useState } from 'react';
import { Query, withApollo } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import ArticlesListItem from './ArticleListItem';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Container from '@material-ui/core/Container';
import { gql } from 'apollo-boost';
import { makeStyles } from '@material-ui/core/styles';


export const ARTICLES_QUERY = gql`
  query allArticles ($filter: ArticleFilter $paging: DataPage $sorting: DataArticleSort) {   
    allArticles (filter: $filter paging: $paging sorting: $sorting) {
      hits {
        id
        title
        url
        image_url
        author {
            githubLogin
        }
      },
      count
    }
  }
`

const useStyles = makeStyles({
  container: {
    paddingTop: "32px",
    paddingBottom: "32px",
  },
  root: {
    flexGrow: 1,
    position: "relative",
  },
  gridContainer: {
    marginBottom: "32px",
  },
  gridItem: {
      height: "350px"
  },
  button: {
    position: "absolute",
    backgroundColor: "#0093ff",
    '&:hover': {
        backgroundColor: "#0093ff"
    }
  },
  "button--left": {
    left: 0
  },
  "button--right": {
    right: 0
  }
});

const ArticlesList = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({paging: {
    first: 6,
    start: 0
  }})

  return (
    <Container className={classes.container}>
        <Query query={ARTICLES_QUERY} variables={state}> 
          {({loading, data, fetchMore}) => loading ? 
            <p>Loading...</p> :
            <div className={classes.root}>
              <Grid container spacing={3} className={classes.gridContainer}>
                {data.allArticles.hits.map(article => 
                  <Grid item sm={4} xs={12} key={article.id} className={classes.gridItem}>
                      <ArticlesListItem data={article} />
                  </Grid>
                )}
              </Grid>
              {state.paging.start - 6 >= 0  &&  (
                <Button
                  color="primary"
                  variant="contained"
                  className={classNames(classes.button, classes["button--left"])}
                  onClick = {() => {
                    const current = state.paging;
                    const next = {
                      paging: {
                        first: 6,
                        start: current.start - 6
                      }
                    }
                    setState(next);
                    fetchMore({
                      variables: {
                        ...next
                      },
                      updateQuery: (prev, { fetchMoreResult}) => {
                        if (!fetchMoreResult) return prev;
                        return fetchMoreResult
                      }
                    })
                  }}
                  >Previous
                </Button>
              )}
              {data.allArticles.count > state.paging.start + 6 && (
                <Button 
                  color="primary"
                  variant="contained"
                  className={classNames(classes.button, classes["button--right"])}
                  onClick = {() => {
                    const current = state.paging;
                    const next = {
                      paging: {
                        first: 6,
                        start: current.start + 6
                      }
                    }
                    setState(next);
                    fetchMore({
                      variables: {
                        ...next
                      },
                      updateQuery: (prev, { fetchMoreResult}) => {
                        if (!fetchMoreResult) return prev;
                        return fetchMoreResult
                      }
                    })
                  }}
                  >Next
                </Button>
                )}
            </div>
            }
        </Query>
    </Container>
  )
}

export default withApollo(ArticlesList);