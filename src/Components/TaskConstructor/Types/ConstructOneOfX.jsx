import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../style.scss'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
        '& .MuiButton-root': {
            margin: theme.spacing(2)
        },
    },
}));

let i

export default function ConstructOneOfX() {
    const classes = useStyles();
    const dispatch = useDispatch()
    let theTask = useSelector(state => state.constructorTests.theTask)
    let isServerLoad = useSelector(state => state.constructorTests.taskLoadedServer)

    let [keysInput, setKeysInput] = useState(['wrong0'])
    let [bodyValues, setBodyValues] = useState({
        task: [],
        correct: [],
        wrongs: []
    })
    let { id } = useParams()

    const changeValues = (e, index, value, key) => {
        if (e.target) {
            bodyValues[key][index] = e.target.value
        } else {
            bodyValues[key][index] = value
        }
        let newBody = { ...bodyValues }
        setBodyValues(newBody)
    }
    useEffect(() => {
        return () => {
            dispatch({ type: "SET_THE_TASK", theTask: bodyValues }) 
        };
    }, [])

    useEffect(() => {
        if (theTask) {
            theTask.wrongs.forEach((element, index, arr) => (index !== arr.length - 1) && addVariant());
            for (let key in theTask) {
                theTask[key].forEach((element, index) => {
                    changeValues({}, index, theTask[key][index], key)
                });
            }
        }
    }, [theTask, id])


    const addVariant = () => {
        let key = index => `wrong${index}`
        let newKey
        i = 0
        do {
            ++i
        } while (keysInput.includes(key(i)));
        newKey = key(i)
        keysInput.push(newKey)
        const newVariants = JSON.parse(JSON.stringify(keysInput))
        setKeysInput(newVariants)
    }

    function removeKey(index) {
        const newVariants = keysInput.filter(element => element !== keysInput[index])
        setKeysInput(newVariants)
    }

    function wronge(index) {
        return (
            <div className="rowVariant" key={keysInput[index]}>
                {buttonsConstructor(index, keysInput)}
                <TextField
                    className={classes.root}
                    onChange={e => changeValues(e, index, null, 'wrongs')}
                    defaultValue={bodyValues.wrongs[index]}
                    label={`Неверный${index + 1}`}
                    multiline
                    rows="1"
                    variant="filled"
                />
            </div>)
    }
    const buttonsConstructor = (index, variants) => {
        if (index === variants.length - 1 && index !== 4 && index !== 0) {
            return (
                <ButtonGroup>
                    <Button
                        style={{
                            margin: 'auto 0'
                        }}
                        variant="contained" onClick={() => removeKey(index)} >-</Button>
                    <Button
                        style={{
                            margin: 'auto 0'
                        }}
                        variant="contained" onClick={() => addVariant(index)} >+</Button>
                </ButtonGroup>
            )
        }
        else if (variants.length === 1) {
            return (
                <Button
                    style={{
                        margin: 'auto 0'
                    }}
                    variant="contained" onClick={() => addVariant(index)} >+</Button>)
        } else {
            return (<Button variant="contained" onClick={() => removeKey(index)} >-</Button>)
        }
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    className={classes.root}
                    onChange={(e) => changeValues(e, 0, null, 'task')}
                    defaultValue={bodyValues.task}
                    label="Задание"
                    multiline
                    rows="5"
                    variant="filled"
                />
                <TextField
                    className={classes.root}
                    onChange={(e) => changeValues(e, 0, null, 'correct')}
                    defaultValue={bodyValues.correct}
                    label={`Верный`}
                    multiline
                    rows="1"
                    variant="filled"
                />
                {
                    keysInput.map((element, index, array) => wronge(index))
                }
            </form>
        </div>
    )
}
