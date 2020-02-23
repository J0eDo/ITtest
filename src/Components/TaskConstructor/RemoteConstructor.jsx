import React, { useState, useEffect } from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { taskTypes } from './TaskConstructorSetting'
import { useParams, useHistory } from 'react-router-dom'
import { getTask } from '../../API/taskConstructor'
import { removeDataByID } from '../../API/adminisrator'
//UI
import Button from '@material-ui/core/Button'
import { Selects } from '../../Style/elements'
import { saveTask } from '../../API/taskConstructor'

import { dialogWindow } from '../DialogWindow/Dialogs'


export default function TestConstructorSetting(props) {
    const [theTaskType, setTheTaskType] = useState(taskTypes[0])
    const [dialogOptions, setDialogOptions] = useState(0)
    const [hasData, setHasData] = useState(false)
    const dispatch = useDispatch()
    const theTask = useSelector(state => state.constructorTests.theTask)
    const previewMode = useSelector(state => state.constructorTests.preview)
    const newID = useSelector(state => state.constructorTests.newTaskID)
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
    }, [id])

    useEffect(() => {
        if (newID) {
            history.push(newID + "")
        }
    }, [newID])

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
        selectID: 'taskType'
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
