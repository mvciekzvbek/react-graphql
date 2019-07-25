import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { gql } from 'apollo-boost';
import { Query, withApollo, compose } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

export const CATEGORIES_QUERY = gql`
    query allCategories {   
        allCategories {
            id
            name
            thumbnail
        }
    }
`

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: "8%",
        paddingBottom: "8%"
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        maxWidth: 900,
        width: "100%"
    },
    anchor: {
        textDecoration: "none",
        color: "inherit",
        position: "relative",
        display: "block",
    },
    thumbnail: {
        height: 0,
        paddingTop: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        "&:hover": {
            "& > div": {
                display: "block"
            }
        }
    },
    layer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        backgroundColor: "black",
        opacity: "0.7",
        color: "white",
        textAlign: "center",
        display: "none",
    },
    name: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "0",
        right: "0",
        margin: "0 auto",
        fontWeight: "bold",
        fontSize: "1.5em"
    }
}));

const Categories = (props) => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Query query={CATEGORIES_QUERY}> 
                {({loading, data}) => loading ? 
                    <p>Loading...</p> :
                    <div className={classes.root}>
                        <Grid container spacing={7} className={classes.gridList} cols={4}>
                            {data.allCategories.map(category => 
                                <Grid item sm={3} xs={12} key={category.id} tabIndex="-1">
                                    <Link className={classes.anchor} to={`/categories/${category.id}`} tabIndex="-1">
                                        <div className={classes.thumbnail} style={{backgroundImage: `url(${category.thumbnail})`}} >
                                            <div className={classes.layer}>
                                                <span className={classes.name}>{category.name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </Grid>
                            )}
                        </Grid>
                    </div>
                }
            </Query>
        </Container>
    )
}

export default Categories;