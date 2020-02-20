import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { taskTypes } from './TaskConstructorSetting'

//UI
import { InfoCard } from '../../Style/elements'
//Components
import RemoteConstructor from './RemoteConstructor'
//              construct               //
import ConstructOneOfX from './Types/ConstructOneOfX'
import ConstructDnD from './Types/ConstructDrugAndDrop'
//              theTask                 //
import OneOfX from '../TheTask/TheTaskType/OneOfX'
import DnD from '../TheTask/TheTaskType/DragAndDrop'


export default function AnswerConstructor() {
    let taskTypeNow = useSelector(state => state.constructorTests.taskType)
    const preview = useSelector(state => state.constructorTests.preview)

    let constructorMode
    let previewMode
    switch (taskTypeNow) {
        case taskTypes[0]:
            constructorMode = ConstructOneOfX
            previewMode = OneOfX
            break;
        case taskTypes[1]:
            constructorMode = ConstructDnD
            previewMode = DnD
            break;
        default:
            break;
    }

    return (
        <div>
            {preview?InfoCard(previewMode):InfoCard(constructorMode)}
            {InfoCard(RemoteConstructor)}
        </div>
    )
}
