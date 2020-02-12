import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { createPortal } from 'react-dom'
import DialogWindow from '../../DialogWindow/DialogWindow'


export default function TableRemotePanel(props) {
    const { buttons, selectedID } = props
    const [dialogOptions, setDialogOptions] = useState(0)
    const [dialogData, setDialogData] = useState({})
    function dialogWindow() {
        if (dialogOptions) {
            return createPortal(<DialogWindow data={dialogData} closed={closeDialog} />, document.getElementById('second'))
        } else {
            return createPortal(null, document.getElementById('second'))
        }
    }

    function enterAction(action, id, isDialog) {
        if (isDialog) {
            setDialogOptions(true)
            setDialogData({ action, id })
        }else{
            console.log("open chtoto");
        }
    }
    const closeDialog = () => {
        setDialogOptions(false)
    }
    return (
        <div>
            {
                buttons.map(Element => (
                    <Button
                        onClick={() => enterAction(Element.id, selectedID, Element.withDialog)}
                        disabled={!(Element.alwaysActiv || selectedID)}
                        key={Element.id}>{Element.label}</Button>
                ))
            }
            {dialogWindow()}
        </div>
    )
}
