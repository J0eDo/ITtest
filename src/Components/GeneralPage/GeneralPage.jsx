import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
//UI
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
//Component
//Until
import { textShower } from '../../until/FileWork'
import titleSite from '../../Content/text/titleSite.txt'
const useStyles = makeStyles(theme => ({
    root: {
        margin: '0px',
    },
    title: {
        minHeight: '15vh',
        width: '95vw',
        margin: '1rem auto',
        padding: '.5rem 1rem'
    }
}));

function GeneralPage() {
    const classes = useStyles();
    const [title, setTitle] = useState('')
    useEffect(() => textShower(titleSite,setTitle), [])
    return (
        <div className={classes.root}>
            <Paper className={classes.title} elevation={5}>
                <p>{title}</p>
            </Paper>
        </div>
    );
}

export default GeneralPage