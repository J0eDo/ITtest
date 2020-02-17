import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import { useHistory } from 'react-router-dom';
import DialogWindow from '../../DialogWindow/DialogWindow'


export default function TableRemotePanel(props) {
    const { buttons, selectedID } = props
    const [dialogOptions, setDialogOptions] = useState(0)
    const [dialogData, setDialogData] = useState({})
    const targetDataID = useSelector(state=>state.admin.targetID)
    let history = useHistory();
    function dialogWindow() {
        if (dialogOptions) {
            return createPortal(<DialogWindow data={dialogData} closed={closeDialog} />,
                document.getElementById('second'))
        } else {
            return createPortal(null, document.getElementById('second'))
        }
    }

    function enterAction(action, id, isDialog, path = null) {
        if (isDialog) {
            setDialogOptions(true)
            setDialogData({ action, id })
        } else {
            history.push(path(targetDataID));
        }
    }
    const closeDialog = () => {
        setDialogOptions(false)
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
            {dialogWindow()}
        </div>
    )
}
