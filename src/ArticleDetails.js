import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateTimeInfo from './DateTimeInfo';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        fontSize: "1em",
        display: "inline-flex",
        textDecoration: "none",
        color: "inherit"
    },
    thumbnail: {
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        marginRight: "10px"
    },
});

const ArticleDetails = (props) => {
    const classes = useStyles();
    const {author, datetime} = props;

    return <Link to={`/users/${author.id}`} className={classes.root}>
        <img className={classes.thumbnail} src={author.avatar} alt=""/>
        <div className={classes.info}>
            <Typography variant="body1">
                {author.githubLogin}
            </Typography>
            <DateTimeInfo data={datetime}/>
        </div>
    </Link>
}

export default ArticleDetails;