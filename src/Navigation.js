import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AuthorizedUser from './AuthorizedUser';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: "#0093ff"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none",
        color: "white",
    },
    "link--right": {
        textDecoration: "none",
        color: "white",
        marginLeft: "auto",
    },
    button: {
        color: "white"
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Link className={classes.link} to="/">
                        <Typography variant="h6" className={classes.title}>
                            Blog IT
                        </Typography>
                    </Link>
                    <Link className={classes['link--right']} to="/categories">
                        <Button className={classes.button}>Categories</Button>
                    </Link>
                    <AuthorizedUser />
                </Toolbar>
            </AppBar>
        </div>
    );
}
