import React, { useState, useEffect } from 'react'
import './style.scss'
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
//Components
import { Selects } from '../../Style/elements'
import { dialogWindow } from '../DialogWindow/Dialogs'

export default function TestConstructorSetting(props) {
    const [theTaskType, setTheTaskType] = useState(taskTypes[0])
    const [dialogOptions, setDialogOptions] = useState(0)
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
    }, [id,dispatch])

    useEffect(() => {
        if (newID) {
            history.push(newID + "")
        }
    }, [newID,history])

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
        dispatch({type:"NEW_TASK_ID",id:'new'})
        history.push('new')
    }

    return (
        <div className="remotePanel">
            <div className="remotePanel_first">
                {previewMode || Selects(selectProps)}
            </div>
            <div className="remotePanel_second">
                {(hasData && isAdmin && !previewMode) && <Button
                    className = 'remotePanel_btn'
                    onClick={deleteTheTask}
                    variant="contained" color="primary">Remove</Button>}
                {!previewMode && <Button
                    onClick={newTheTask}
                    variant="contained" color="primary">+ New</Button>}
                {previewMode && <Button
                    onClick={save}
                    variant="contained" color="primary">save</Button>}
                <Button
                    onClick={preview}
                    variant="contained" color="primary">
                    {previewMode ? "Edit" : "Preview & Save"}</Button>
            </div>
            {dialogWindow(dialogOptions, setDialogOptions,
                { action: "REMOVE_THE_TASK", id })}
        </div>
    )
}
