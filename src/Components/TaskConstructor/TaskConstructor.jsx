import React from 'react'
import { useSelector } from 'react-redux'
import './style.scss'
//Until
import { taskTypes } from './TaskConstructorSetting'
//Material UI
import Paper from '@material-ui/core/Paper'
//Components
import { InfoCard } from '../../Style/elements'
import RemoteConstructor from './RemoteConstructor'
//              construct               //
import ConstructOneOfX from './Types/ConstructOneOfX'
import ConstructDnD from './Types/ConstructDrugAndDrop'
//              theTask                 //
import OneOfX from '../TheTask/TheTaskType/OneOfX'
import DnD from '../TheTask/TheTaskType/DragAndDrop'


export default function TaskConstructor() {
    let taskTypeNow = useSelector(state => state.theTask.taskType)
    const preview = useSelector(state => state.theTask.preview)

    let ConstructorMode
    let PreviewMode
    switch (taskTypeNow) {
        case taskTypes[0]:
            ConstructorMode = ConstructOneOfX
            PreviewMode = OneOfX
            break;
        case taskTypes[1]:
            ConstructorMode = ConstructDnD
            PreviewMode = DnD
            break;
        default:
            break;
    }

    return (
        <div className='fullMode'>
            <Paper className='theTest_conteiner'>
                {preview ? <PreviewMode /> : <ConstructorMode />}
            </Paper>  
            <RemoteConstructor />
        </div>
    )
}
