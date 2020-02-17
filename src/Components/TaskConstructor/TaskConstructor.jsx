import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { taskTypes } from './TaskConstructorSetting'

//UI
import { InfoCard } from '../../Style/elements'
//Components
import RemoteConstructor from './RemoteConstructor'
import OneOfX from './Types/OneOfX'
import DnD from './Types/DrugAndDrop'

export default function AnswerConstructor() {
    let taskTypeNow = useSelector(state => state.constructorTests.taskType)


    let canvas
    switch (taskTypeNow) {
        case taskTypes[0]:
            canvas = OneOfX
            break;
        case taskTypes[1]:
            canvas = DnD
            break;
        default:
            break;
    }

    return (
        <div>
            {InfoCard(canvas)}
            {InfoCard(RemoteConstructor)}
        </div>
    )
}
