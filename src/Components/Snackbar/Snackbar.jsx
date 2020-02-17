import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbars() {
    const classes = useStyles();
    const message = useSelector(state => state.notification.message)
    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({type:"REMOVE_NOTIFICATION"})
    };

    return (
        message ?
            <div className={classes.root}>
                <Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={message.severity}>
                        {message.title}
                    </Alert>
                </Snackbar>
            </div>:<React.Fragment></React.Fragment>
    );
}