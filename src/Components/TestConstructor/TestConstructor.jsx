import React from 'react'
import AddedTheTask from './AddedTheTask'
import TestGeneralProps from './TestGeneralProps'
import {InfoCard} from '../../Style/elements'
import './style.scss'
export default function TestConstructor() {
    
    return (
       <div>
          {InfoCard(TestGeneralProps)}
          {InfoCard(AddedTheTask)}
       </div>
    )
}
