import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import { Paper } from '@material-ui/core';
import { Selects } from '../../../Style/elements'
import { taskTypes } from '../TaskConstructorSetting'
import TextField from '@material-ui/core/TextField'
import './style.scss'



export default function Fade({ visibly }) {
  const [typeTask, setTypeTask] = useState()

  const setDataHandler = event => {
    setTypeTask(event.target.value)
  }

  return (
    <CSSTransition in={visibly}
      mountOnEnter
      unmountOnExit
      mountOnEnter={true}
      timeout={1000} classNames='panelSetting' >
      <div className='panelSetting'>
        <div className='formSetting'>
          <div className='formSetting_elem'>
            <p>Тип:</p>
            <div className='panelSetting__inlineElement'>
              {Selects({
                defaultValue: taskTypes[0],
                setDataHandler,
                items: taskTypes
              })}
            </div>
          </div>
          <div className='formSetting_elem'>
            <p>Тест: </p>
            <div className='panelSetting__inlineElement'>
              <TextField autoComplete='section-blue shipping street-address'/>
            </div>
            <div className='panelSetting__inlineElement'>
              &#x1F79C;
              </div>
          </div>
          <div className='formSetting_elem'>
            <p>Теги: </p>
            <div className='panelSetting__inlineElement'>
              <TextField />
            </div>
            <div className='panelSetting__inlineElement'>
              &#x1F79C;
              </div>
          </div>
        </div>
        <div className='tegs-area'>
              <div className='tegs-area__message'>
                    NO TAGS
              </div>
        </div>
      </div>
    </CSSTransition>
  )
}