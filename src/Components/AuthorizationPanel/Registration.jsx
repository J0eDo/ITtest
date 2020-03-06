import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux'
//API
import { registration } from '../../API/profile'
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    error_auth: {
        margin: '0'
    },
    login_link: {
        cursor: 'pointer',
        margin: '0',
        textDecoration: 'underline',
        color: 'blue'
    }
}));


function App() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const setLogin = useCallback(
        () => dispatch({ type: "SET_AUTH_MODE", mode: 2 }),
        [dispatch])

    return (
        <React.Fragment>
            <h3>Регистрация</h3>
            <TextField id="username" label="Username" variant="outlined" />
            <p className={classes.error_auth}
                id="login_error" />
            <TextField id="email" label="Email" type="email" variant="outlined" />
            <p className={classes.error_auth}
                id="name_error" />
            <TextField id="password" label="Password" type="password" variant="outlined" />
            <p className={classes.error_auth}
                id="password_error" />
            <p id='errorReg'></p>
            <p className={classes.login_link}
                onClick={setLogin}
            >Есть аккаунт!</p>
            <Button
                onClick={() => registration(dispatch)}
                variant="contained" color="primary">Зарегистрироваться</Button>
        </React.Fragment>
    );
}

export default App