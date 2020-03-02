import React, { useEffect } from 'react'
import OneOfX from './TheTaskType/OneOfX'
import { useDispatch } from 'react-redux'

export default function TheTask({ task }) {
    let component
    const dispatch = useDispatch()

    useEffect(() => {
        task&&dispatch({ type: 'SET_THE_TASK', theTask: task.body })
    }, [task])

    const setTypeTask = type => {
       
        switch (task.type) {
            case 'Test':
                return <OneOfX />
            default:
                break;
        }
    }
    return (
        <div>
            {task && setTypeTask(task.type)}
        </div>
    )
}
