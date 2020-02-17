import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
//UI
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
//Component
import Login from './Login'
import Registration from './Registration'


const MODE = { registration: 1, login: 2, close: null }
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        position: 'fixed',
        zIndex: '100',
        flexFlow: 'column nowrap',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(130,200,150,.4)',
        height: '100vh',
        width: '100vw',
        '& > *': {
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            minWidth: theme.spacing(38),
            height: theme.spacing(50),
        },
    },
}));

function AuthorizationPanel() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const closeWindow = (e) => {
        if (e.target.id === 'closeAuthArea')
            dispatch({ type: "SET_AUTH_MODE", mode: MODE.close })
    }
    const mode = useSelector(state => state.auth.mode)
    function authMode(state) {
        switch (state) {
            case MODE.registration:
                return <Registration />
            case MODE.login:
                return <Login />
            default:
                break;
        }
    }
    return (
        <div className={classes.root}
            onClick={closeWindow}
            id='closeAuthArea'
        >
            <Paper elevation={3}>
                {authMode(mode)}
            </Paper>
        </div>
    );
}

export default AuthorizationPanel