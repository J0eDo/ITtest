import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux'
//Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
//API
import { login } from '../../API/profile'


const useStyles = makeStyles(theme => ({
    error_auth: {
        margin: '0'
    },
    registration_link: {
        cursor: 'pointer',
        margin: '0',
        textDecoration: 'underline',
        color: 'blue'
    }
}));

const App = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const setRegistration = useCallback(
        () => dispatch({ type: "SET_AUTH_MODE", mode: 1 }),
        [dispatch])
    return (
        <React.Fragment>
            <h3>Войти</h3>
            <p className={classes.error_auth}></p>
            <TextField id="email" label="email" variant="outlined" />
            <TextField id="password" label="password" variant="outlined" />
            <p id='errorLogin'></p>
            <p className={classes.registration_link}
                onClick={setRegistration}
            >Регистрация</p>
            <Button
                onClick={()=>login(dispatch)}
                variant="contained" color="primary">Войти</Button>
        </React.Fragment>
    );
}

export default App