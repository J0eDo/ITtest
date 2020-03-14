import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
//API
import { getTestTask } from '../../API/passingTheTest'
import { downloadPicture } from '../../API/fileAPI'
//Material UI
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import yellow from "@material-ui/core/colors/yellow";
//Components
import TheTask from '../TheTask/TheTask'

const yellow100 = yellow["300"];



export default function PassingTest() {
    const isActiveBtn = useSelector(state => state.theTask.btnNextActive)
    const dispatch = useDispatch()
    const history = useHistory()
    const { testName } = useParams()
    const [test, setTest] = useState(null)
    let [indexTask, setIndexTask] = useState(0)
    const [tasks, setTasks] = useState([])
    const [poster, setPoster] = useState()

    const getTest = async () => {
        const res = await getTestTask(testName)
        setTest(res.test[0])
        setTasks(res.test[0].tasks)
    }

    const getPoster = async () => {
        const fileName = 'JS базовый' + '.jpg'
        await downloadPicture(setPoster, '/tests/img/', 'JS базовый.jpg');
    }

    useEffect(() => {
        getTest()
        getPoster()
    }, [])

    const testInfo = () => (
        <div className='testInfo'>
            {indexTask + 1}/{tasks.length}
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
        <div className='fullMode'>
            <Paper className='theTest_conteiner'>
                {tasks && <TheTask task={tasks[indexTask]} />}
            </Paper>
            <Paper className='remotePanel' style={{backgroundColor:yellow100}}>
                <img className='testList_BG' src={poster && 'data:image/gif;base64,' + poster} alt="a" />
                {test && testInfo()}
                <Button
                    disabled={!isActiveBtn}
                    className='remotePanel_btn'
                    onClick={next}
                    variant='contained'
                    color='primary'
                >Ок</Button>
            </Paper>
        </div>
    )
}
