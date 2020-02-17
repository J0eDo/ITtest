import React, { useState, useEffect } from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { taskTypes, getInputsFields } from './TaskConstructorSetting'
import { useParams } from 'react-router-dom'
import { getTask } from '../../API/taskConstructor'
//UI
import Button from '@material-ui/core/Button'
import { Selects } from '../../Style/elements'
import { saveTask } from '../../API/taskConstructor'


export default function TestConstructorSetting() {
    const [theTaskType, setTheTaskType] = useState(taskTypes[0])
    const dispatch = useDispatch()
    const taskLinks = useSelector(state => state.constructorTests.inputLinks)
    let { id } = useParams()
    id = parseInt(id)
    useEffect(() => {
        if (Number.isInteger) {
            getTask(dispatch, id)
        }
    }, [id])

    const setDataHandler = event => {
        setTheTaskType(event.target.value)
        dispatch({ type: "THE_TASK_TYPE", theTaskType })
    }


    const selectProps = {
        dataType: theTaskType,
        setDataHandler,
        items: taskTypes,
        selectID: 'taskType'
    }

    const save = () => {
        const dataTask = getInputsFields(taskLinks)
        dataTask.type = theTaskType
        saveTask(dispatch, dataTask, id)
    }

    return (
        <div className="remotePanel">
            <div className="remotePanel_first">
                {Selects(selectProps)}
            </div>
            <div className="remotePanel_second">
                <Button variant="contained" color="primary">Remove</Button>
                <Button
                    onClick={save}
                    variant="contained" color="primary">Save</Button>
                <Button variant="contained" color="primary">Preview</Button>
                <Button variant="contained" color="primary">+ New</Button>

            </div>
        </div>
    )
}
