import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
//Material UI
import Button from '@material-ui/core/Button'
//Component
import { dialogWindow } from '../../DialogWindow/Dialogs'




export default function TableRemotePanel(props) {
    const { buttons, selectedID } = props
    const [dialogOptions, setDialogOptions] = useState(0)
    const [dialogData, setDialogData] = useState({})
    const targetDataID = useSelector(state => state.admin.targetID)
    let history = useHistory();

    function enterAction(action, id, isDialog, path = null) {
        if (isDialog) {
            setDialogOptions(true)
            setDialogData({ action, id })
        } else {
            history.push(path(targetDataID));
        }
    }

    return (
        <div className="remoteTable">
            {
                buttons.map(Element => (
                    <Button
                        className='remoteTable_btn'
                        variant='contained'
                        onClick={() => enterAction(Element.id, selectedID, Element.withDialog, Element.path)}
                        disabled={!(Element.alwaysActiv || selectedID)}
                        key={`${Element.id}`}>{Element.label}</Button>
                ))
            }
            {dialogWindow(dialogOptions, setDialogOptions, dialogData)}
        </div>
    )
}
