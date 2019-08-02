import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import DateTimeInfo from './DateTimeInfo';

const useStyles = makeStyles({
  root: {
    fontSize: '1em',
    display: 'inline-flex',
    textDecoration: 'none',
    color: 'inherit',
  },
  thumbnail: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    marginRight: '10px',
  },
});

const ArticleDetails = (props) => {
  const classes = useStyles();
  const { author, datetime } = props;

  return (
    <Link to={`/users/${author.githubLogin}`} className={classes.root}>
      <img className={classes.thumbnail} src={author["avatar_url"]} alt="" />
      <div className={classes.info}>
        <Typography variant="body1">
          {author.githubLogin}
        </Typography>
        <DateTimeInfo data={datetime} />
      </div>
    </Link>
  );
};

export default ArticleDetails;
