import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: "1em",
        // marginTop: "1em",
        // marginBottom: "1em",
        display: "inline-flex",
        // alignSelf: "flex-end"
    },
    chip: {
        margin: theme.spacing(1),
    },
}));

const CategoryBox = (props) => {
    const classes = useStyles();
    const {data} = props;    
    
    return <div className={classes.root}>
        {data.map((category, index) => {
            return <Chip key={index} className={classes.chip} label={category.name}/>
        })}
    </div>
}

export default CategoryBox;