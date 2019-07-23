import React from 'react';
import { Query, withApollo, compose } from 'react-apollo';
// import { ROOT_QUERY } from './App';
import Grid from '@material-ui/core/Grid';
import ArticlesListItem from './ArticleListItem';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Container from '@material-ui/core/Container';
import { gql } from 'apollo-boost';

export const ARTICLES_QUERY = gql`
    query allArticles ($filter: ArticleFilter $page: DataPage $sort: DataArticleSort) {   
        allArticles (filter: $filter paging: $page sorting: $sort) {
            id
            title
            # lead
            url
            imageUrl
            # categories {
            #     name
            # }
            authors {
                githubLogin
            }
            # created
        }
    }
`

const styles = theme => ({
    container: {
        paddingTop: "32px",
        paddingBottom: "32px"
    },
    root: {
        flexGrow: 1,
        position: "relative"
    },
    gridContainer: {
        marginBottom: "32px"
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

class Articles extends React.Component {
    state = {
        filter: {
        },
        page: {
            first: 6,
            start: 0
        },
        sort: {}
    }

    constructor(props) {
        super(props)
    }

    render () {
        const {classes, client} = this.props;

        return (
            <Container className={classes.container}>
                <Query query={ARTICLES_QUERY} variables={this.state}> 
                    {({loading, data}) => loading ? 
                        <p>Loading...</p> :
                        <div className={classes.root}>
                            <Grid container spacing={3} className={classes.gridContainer}>
                                {data.allArticles.map(article => 
                                    <Grid item sm={4} xs={12} key={article.id} className={classes.gridItem}>
                                        <ArticlesListItem data={article} />
                                    </Grid>
                                )}
                            </Grid>
                            <Button
                                color="primary"
                                variant="contained"
                                className={classNames(classes.button, classes["button--left"])}
                                onClick = {async () => {
                                    const prev = this.state.page;
                                    const next = {
                                        first: 6,
                                        start: prev.start - 6,
                                    }
                                    this.setState({page: next}, async () => {
                                        await client.query({
                                            query: ROOT_QUERY,
                                            variables: this.state
                                        })
                                    })
                                }}>Previous</Button>
                                <Button 
                                    color="primary"
                                    variant="contained"
                                    className={classNames(classes.button, classes["button--right"])}
                                    
                                    onClick={ async () => {
                                        const prev = this.state.page;
                                        const next = {
                                            first: 6,
                                            start: prev.start + 6.
                                        }
                                        this.setState({page: next}, async () => {
                                            await client.query({
                                                query: ROOT_QUERY,
                                                variables: this.state
                                            })
                                        });
                                }}>Next</Button>
                        </div>
                    }
                </Query>
            </Container>
        )
    }
}

export default compose(withStyles(styles), withApollo)(Articles);