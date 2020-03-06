import React, { useEffect } from 'react'
import OneOfX from './TheTaskType/OneOfX'
import { useDispatch } from 'react-redux'

export default function TheTask({ task }) {
    const dispatch = useDispatch()

    useEffect(() => {
        task && dispatch({ type: 'SET_THE_TASK', theTask: task.body })
    }, [task, dispatch])

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
