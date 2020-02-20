import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
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
        <div className="remotePanel">
            {
                buttons.map(Element => (
                    <Button
                        onClick={() => enterAction(Element.id, selectedID, Element.withDialog, Element.path)}
                        disabled={!(Element.alwaysActiv || selectedID)}
                        key={`${Element.id}`}>{Element.label}</Button>
                ))
            }
            {dialogWindow(dialogOptions, setDialogOptions, dialogData)}
        </div>
    )
}
