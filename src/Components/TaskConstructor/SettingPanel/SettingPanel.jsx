import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
//API
import { getGlobalTaskParams } from '../../../API/taskConstructor'

import { CSSTransition } from 'react-transition-group';
import { Paper } from '@material-ui/core';
import { Selects } from '../../../Style/elements'
import { taskTypes } from '../TaskConstructorSetting'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { dialogWindow } from '../../DialogWindow/Dialogs'
import './style.scss'

const useStyles = makeStyles(theme => ({
  button: {
    margin: [theme.spacing(1), 'auto'],
    width: 300,
    backgroundColor: '#ff0101',
    border: '1px solid #1010ff'
  },
}));


export default function Fade({
  remotePanelActive, deleteTheTask,
  dialogWindowControll, setDialogAction
}) {

  const [typeTask, setTypeTask] = useState()
  const [taskProps, setTaskProps] = useState()
  const dispatch = useDispatch()
  const classes = useStyles();
  const { dialogOptions, setDialogOptions } = dialogWindowControll
  const setAutocompleteOption = async () => {
    let data = await getGlobalTaskParams()
    setTaskProps({ tags: data.tags, testNames: data.testNames })
  }



  const setDataHandler = event => {
    setDialogOptions(true)
    const handler = () => {
      setTypeTask(event.target.value)
      dispatch({ type: 'THE_TASK_TYPE', taskType: event.target.value })
    }
    setDialogAction({
      action: 'CHANGE_TASK_TYPE_CONSTRUCTOR',
      handler
    })
  }
  useEffect(() => {
    setAutocompleteOption()
    return () => {

    }
  }, [])



  return (<React.Fragment>
    <CSSTransition in={remotePanelActive}
      mountOnEnter
      unmountOnExit
      mountOnEnter={true}
      timeout={1000} classNames='panelSetting' >
      <div className='panelSetting'>
        <div className='formSetting'>
          <div className='formSetting_elem'>
            <p>Тип:</p>
            <div className='panelSetting__inlineElement' >
              {Selects({
                defaultValue: taskTypes[0],
                setDataHandler,
                items: taskTypes,
                style: { width: 180 }
              })}
            </div>
          </div>
          <div className='formSetting_elem'>
            <p>Тест: </p>
            <div className='panelSetting__inlineElement'>
              <Autocomplete
                onChange={e => dispatch({
                  type: 'SET_THE_TASK_TEST',
                  theTaskTestName: e.currentTarget.textContent
                })}
                options={taskProps && taskProps.testNames}
                getOptionLabel={option => option}
                style={{ width: 180 }}
                renderInput={params => <TextField style={{ width: 180 }} {...params} />}
              />
            </div>
          </div>
          <div className='formSetting_elem'>
            <p>Теги: </p>
            <div className='panelSetting__inlineElement'>
              <Autocomplete
                options={taskProps && taskProps.tags}
                getOptionLabel={option => option}
                style={{ width: 180 }}
                renderInput={params => <TextField style={{ width: 180 }} {...params} />}
              />
            </div>
          </div>
        </div>
        <div className='tegs-area'>
          <div className='tegs-area__message'>
            NO TAGS
              </div>
        </div>
        <div className='panelSetting_delete'>
          <Button
            onClick={deleteTheTask}
            variant="contained"
            className={classes.button}
          ><DeleteIcon color='primary' /></Button>
        </div>
      </div>
    </CSSTransition>
  </React.Fragment>
  )
}