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
    const previewTask = useSelector(state => state.constructorTests.previewTask)
    let theTask = useSelector(state => state.constructorTests.theTask)
    if (!theTask) {
        theTask = previewTask
    }else{
        theTask = theTask.body
    }


    let [variants, setVariants] = useState(['wrong0'])
    let { id } = useParams()
    let oneOfX = {
        task: 'task',
        correct: 'correct',
        wrongs: variants
    }

    useEffect(() => {
        dispatch({ type: "INPUTS_LINKS", inputLinks: oneOfX })
    }, [variants])

    useEffect(() => {
        console.log(theTask);
        
        if (!parseInt(id)) {
            setVariants(['wrong0'])
            for (let key in oneOfX) {
                if (!Array.isArray(oneOfX[key])) {
                    inputValue(key, "")
                } else {
                    oneOfX[key].forEach(element => {
                        inputValue(element, "")
                    });
                }
            }
        }
    }, [id])

    useEffect(() => {
            if (theTask) {
                theTask.wrongs.forEach((element, index, arr) => (index !== arr.length - 1) && addVariant());
                for (let key in theTask) {
                    if (!Array.isArray(theTask[key])) {
                        inputValue(key, theTask[key])
                    } else {
                        theTask[key].forEach((element, index) => {
                            //time for reconstruct DOM
                            setTimeout(() => {
                                inputValue(variants[index], theTask.wrongs[index])
                            }, 0);
                        });
                    }
                }
            }
    }, [theTask])

    function inputValue(id, newValue) {
        let elem = document.getElementById(id)
        elem.value = newValue
    }

    const addVariant = () => {
        let key = index => `wrong${index}`
        let newKey
        i = 0
        do {
            ++i
        } while (variants.includes(key(i)));
        newKey = key(i)
        variants.push(newKey)
        const newVariants = JSON.parse(JSON.stringify(variants))
        setVariants(newVariants)
    }


    function removeKey(index) {
        const newVariants = variants.filter(element => element !== variants[index])
        setVariants(newVariants)
    }

    const correct = () => (
        <TextField
            id={oneOfX.correct}
            className={classes.root}
            label={`Верный`}
            multiline
            rows="1"
            defaultValue=""
            variant="filled"
        />
    )
    function wronge(index) {
        return (
            <div className="rowVariant" key={variants[index]}>
                {buttonsConstructor(index, variants)}
                <TextField
                    id={variants[index]}
                    className={classes.root}
                    label={`Неверный${index + 1}`}
                    multiline
                    rows="1"
                    defaultValue=""
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
                    id={oneOfX.task}
                    className={classes.root}
                    label="Задание"
                    multiline
                    rows="5"
                    variant="filled"
                />
            </form>
            <form className={classes.root} noValidate autoComplete="off">

                {correct()}
                {
                    variants.map((element, index, array) => wronge(index))
                }

            </form>
        </div>
    )
}
