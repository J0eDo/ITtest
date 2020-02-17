import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { dataBaseNameOnServer } from '../Admin/DataTable/ModeTable'
//MaterialUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//Dialogs 
import option from './Dialogs'

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch()
    let { closed, data } = props
    const dialogBody = option(data.action)
    let dataName = useSelector(state => state.admin.dataType)

    const handleDisagree = () => {
        setOpen(false);
        closed()
    };


    const handleAgree = () => {
        setOpen(false);
        closed()
        dialogBody.handler(dispatch, data.id,dataName)
    };


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleDisagree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialogBody.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogBody.body(data.id)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree} color="primary" autoFocus>
                        Disagree
          </Button>
                    <Button onClick={handleAgree} color="primary" >
                        Agree
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
