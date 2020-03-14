import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
//API
import { getTask } from '../../API/taskConstructor'
import { removeDataByID } from '../../API/adminisrator'
import { saveTask } from '../../API/taskConstructor'
//Until
import { taskTypes } from './TaskConstructorSetting'
//Material UI
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import BuildIcon from '@material-ui/icons/Build';
import FiberNewIcon from '@material-ui/icons/FiberNew';
//Components
import { dialogWindow } from '../DialogWindow/Dialogs'
import SettingPanel from './SettingPanel/SettingPanel'



export default function TestConstructorSetting() {

    const [theTaskType, setTheTaskType] = useState(taskTypes[0])
    const [dialogOptions, setDialogOptions] = useState(0)
    const [remotePanelActive, setRemotePanelActive] = useState(false)
    const [hasData, setHasData] = useState(false)
    const dispatch = useDispatch()
    const theTask = useSelector(state => state.theTask.theTask)
    const previewMode = useSelector(state => state.theTask.preview)
    const newID = useSelector(state => state.theTask.newTaskID)
    const isAdmin = (useSelector(state => state.auth.access) === 2)
    let { id } = useParams()
    let history = useHistory();
    id = parseInt(id)



    useEffect(() => {
        if (Number.isInteger(id)) {
            getTask(dispatch, id)
            setHasData(true)
        } else {
            setHasData(false)
        }
    }, [id, dispatch])

    useEffect(() => {
        if (newID) {
            history.push(newID + "")
        }
    }, [newID, history])

    const switchDataHandler = (value) => {
        setTheTaskType(value)
        dispatch({ type: "THE_TASK_TYPE", taskType: value })
    }

    const setDataHandler = event => {
        switchDataHandler(event.target.value)
    }


    const selectProps = {
        dataType: theTaskType,
        setDataHandler,
        items: taskTypes,
    }

    const save = () => {
        const type = theTaskType
        saveTask(dispatch, theTask, id, type)
        setHasData(true)
        history.push('new')
    }

    const preview = () => {
        dispatch({ type: "PREVIEW", preview: !previewMode })
    }

    const deleteTheTask = () => {
        removeDataByID(dispatch, id, 'Tasks')
        newTheTask()
        history.push('new')
    }

    const newTheTask = () => {
        dispatch({ type: "NEW_TASK_ID", id: 'new' })
        history.push('new')
    }

    return (
        <React.Fragment>
            <SettingPanel visibly={remotePanelActive} />
            <Paper
                style={{ backgroundColor: '#331155' }}>
                <div  className="remotePanel">
                    {(hasData && isAdmin && !previewMode) && <Button
                        className='remotePanel_btn'
                        onClick={deleteTheTask}
                        variant="contained" color="primary">Remove</Button>}
                    {!previewMode && <Button
                        className='remotePanel_btn'
                        onClick={newTheTask} color='primary'
                        variant="contained" ><FiberNewIcon
                        /></Button>}
                    {previewMode && <Button
                        className='remotePanel_btn'
                        onClick={save}
                        variant="contained" color="primary">
                        <SaveIcon style={{
                            color: '#11ff33'
                        }} /></Button>}
                    <Button
                        className='remotePanel_btn'
                        onClick={() => setRemotePanelActive(!remotePanelActive)}
                        variant="contained" color="primary">
                        <BuildIcon /></Button>
                    <Button
                        className='remotePanel_btn'
                        onClick={preview}
                        variant="contained" color="primary">
                        {previewMode ? "назад" : "далее"}</Button>
                    {dialogWindow(dialogOptions, setDialogOptions,
                        { action: "REMOVE_THE_TASK", id })}
                </div>
            </Paper>
        </React.Fragment>
    )
}
