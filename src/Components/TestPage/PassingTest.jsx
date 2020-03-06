import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
//API
import { getTestTask } from '../../API/passingTheTest'
//Material UI
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
//Components
import TheTask from '../TheTask/TheTask'

export default function PassingTest() {
    const isActiveBtn = useSelector(state => state.theTask.btnNextActive)
    const dispatch = useDispatch()
    const history = useHistory()
    const { testName } = useParams()
    const [test, setTest] = useState(null)
    let [indexTask, setIndexTask] = useState(0)
    const [tasks, setTasks] = useState([])

    const getTest = async () => {
        const res = await getTestTask(testName)
        setTest(res.test[0])
        setTasks(res.test[0].tasks)

    }

    useEffect(() => {
        getTest()
    }, [])

    const testInfo = () => (
        <div>
            <p>{testName}</p>
            <p>{indexTask + 1}/{tasks.length}</p>
        </div>)

    const next = () => {
        dispatch({ type: 'NEXT_TASK' })
        if (indexTask + 1 !== tasks.length) {
            setIndexTask(++indexTask)
        } else {
            dispatch({ type: 'RESULT', numTasks: tasks.length })
            history.push('/resultTest')
        }
    }

    return (
        <div>
            <Paper className='theTest_conteiner'>
                {tasks && <TheTask task={tasks[indexTask]} />}
            </Paper>
            <Paper className='remotePanel'>
                {test && testInfo()}
                <Button
                    disabled={!isActiveBtn}
                    className='remotePanel_btn'
                    onClick={next}
                    variant='contained'
                    color='primary'
                >Next</Button>
            </Paper>
        </div>
    )
}
