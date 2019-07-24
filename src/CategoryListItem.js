import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    // card: {
    //     height: "100%"
    // },
    // media: {
    //     height: 0,
    //     paddingTop: "50%"
    // },
    // anchor: {
    //     textDecoration: "none",
    //     color: "inherit",
    //     display: "block",
    //     height: "100%"
    // },
    thumbnail: {
        height: 0,
        paddingTop: "100%",
        // width: "250px",
        // height: "250px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }
});

const CategoryListItem = (props) => {
    const {data} = props;
    const classes = useStyles();

    return <Link className={classes.anchor} to={`/categories/${data.id}`}>
        <div className={classes.thumbnail} style={{backgroundImage: `url(${data.thumbnail})`}}></div>
    </Link>
}

export default CategoryListItem;