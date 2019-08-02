import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '1em',
    display: 'inline-flex',
  },
  anchor: {
    textDecoration: "none"
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

const CategoryBox = (props) => {
  const classes = useStyles();
  const { data } = props;

  return (
    <div className={classes.root}>
      {data.map((category, index) => <a className={classes.anchor} key={index} href={`/categories/${category.name}`}><Chip className={classes.chip} label={category.name} /></a>)}
    </div>
  );
};

export default CategoryBox;
