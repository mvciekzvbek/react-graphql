import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    height: '100%',
  },
  media: {
    height: 0,
    paddingTop: '50%',
  },
  anchor: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    height: '100%',
  },
});

const ArticlesListItem = (props) => {
  const { data, author } = props;
  const classes = useStyles();

  return (
    <Link className={classes.anchor} to={data.url} params={data}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={data.image_url}
            title="Contemplative Reptile"
          />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {data.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            @{ author ? author.githubLogin : data.author.githubLogin }
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticlesListItem;
