import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Container from '@material-ui/core/Container';
import CategoryBox from './CategoryBox';
import ArticleDetails from './ArticleDetails';

const ARTICLE_QUERY = gql`
  query article($filter: ArticleFilter) {   
    allArticles(filter: $filter) {
      hits {
        title
        lead
        content
        url
        image_url
        categories {
            name
        }
        author {
            id
            githubLogin,
            avatar_url
        }
        created_at
      }
    }
  }
`;

const useStyles = makeStyles({
  container: {
    paddingTop: '32px',
    paddingBottom: '32px',
    maxWidth: '900px'
  },
  paper: {
    padding: '32px',
  },
  mainImage: {
    height: 0,
    paddingTop: '50%',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  header: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
  },
  infoWrapper: {
    fontSize: '2.125rem',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.5em',
    marginBottom: '0.5em',
  },

});

const Article = (props) => {
  const classes = useStyles();
  const filter = {
    filter: {
      id: parseInt(props.match.params.id, 10),
    },
  };

  return (
    <Container className={classes.container}>
      <Query query={ARTICLE_QUERY} variables={filter}>
        {({ loading, data }) => (loading
          ? <p>Loading...</p>
          : (
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <div className={classes.mainImage} style={{ backgroundImage: `url(${data.allArticles.hits[0]["image_url"]})` }} />
                <Typography variant="h4" className={classes.header} gutterBottom>
                  {data.allArticles.hits[0].title}
                </Typography>
                <div className={classes.infoWrapper}>
                  <ArticleDetails author={data.allArticles.hits[0].author} time={data.allArticles.hits[0]["created_at"]} />
                  <CategoryBox data={data.allArticles.hits[0].categories} />
                </div>
                <Typography variant="body1" gutterBottom>
                  {data.allArticles.hits[0].lead}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {data.allArticles.hits[0].content}
                </Typography>
              </Paper>
            </div>
          ))
        }
      </Query>
    </Container>
  );
};

export default Article;
