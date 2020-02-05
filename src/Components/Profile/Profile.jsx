import React from 'react';
import {  useSelector } from 'react-redux'
//UI
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
//Component

const useStyles = makeStyles(theme => ({
    root: {}
}));

function Profile() {
    const classes = useStyles();
    return (
    <div className={classes.root}>
        <Paper  elevation={3}>
           <h1>It Profile</h1>
        </Paper>
    </div>
    );
}

export default Profile