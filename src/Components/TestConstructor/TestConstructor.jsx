import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import './style.scss'
//API
import { getTestByID } from '../../API/testConstructor'
//Components
import AddedTheTask from './AddedTheTask'
import TestGeneralProps from './TestGeneralProps'
import { InfoCard } from '../../Style/elements'

export default function TestConstructor() {
   const history = useHistory()
   let { id } = useParams()
   const dispatch = useDispatch()
   const [theTest, setTheTest] = useState({})

   useEffect(() => {
      id = parseInt(id)
      if (Number.isInteger(id)) {
         getTestByID(dispatch, id)
            .then((response) => {
               if (response.data.theTest) {
                  setTheTest(response.data.theTest)
               } else {
                  history.push('new')
               }
            })
      } else {
         history.push('new')
      }
   }, [id])




   return (
      <div>
         {InfoCard(TestGeneralProps,theTest)}
         {JSON.stringify(theTest)!=='{}'&&InfoCard(AddedTheTask,theTest)}
      </div>
   )
}
