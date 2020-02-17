import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useDispatch } from 'react-redux'
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

export default function OneOfX() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [variants, setVariants] = useState(['wrong0'])
    let oneOfX = {
        task: 'task',
        correct: 'correct',
        wrongs: variants
    }

    useEffect(() => {
        dispatch({ type: "INPUTS_LINKS", inputLinks: oneOfX })
    }, [variants])

    const addVariant = () => {
        variants.push(true)
        setVariants(variants)
        const newVariants = variants.map((element, index) => `wrong${index}`)
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
                    label="Task text"
                    multiline
                    rows="5"
                    defaultValue=""
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
