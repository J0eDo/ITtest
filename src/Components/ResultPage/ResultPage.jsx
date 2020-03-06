import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'


export default function ResultPage() {
    const resultTest = useSelector(state => state.theTask.result)
    const [result, setResult] = useState('')
    const history = useHistory()
    useEffect(() => {
        if (!resultTest) {
            history.push('/')
        } else {
            setResult(`${resultTest[0]}/${resultTest[1]}`)
        }
    }, [history,resultTest])
    
    return (
        <Paper>
            <h1>Тест пройден</h1>
            <h4>Ваш результат {result}</h4>
        </Paper>
    )
}
