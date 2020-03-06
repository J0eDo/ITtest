import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
//API
import { lastTest } from '../../../API/content'
import { downloadPicture } from '../../../API/fileAPI'
//Material UI
import Paper from '@material-ui/core/Paper'
//Components
import { theTestBtn } from '../../../Style/elements'

export default function NewTests() {
    const history = useHistory()
    const [testData, setTestData] = useState()
    const [poster, setPoster] = useState()
    const pictureName = testName => `test_${testName}_Bgposter`
    const getLastTest = async () => {
        let { test } = await lastTest()
        setTestData(test)
    }

    const getPoster = async () => {
        await downloadPicture(setPoster,'tests/img/',testData.testName+'.jpg') 
        console.log(poster);
        
    }

    useEffect(() => {
        getLastTest()
    }, [])
    useEffect(() => {
        testData && getPoster()
    }, [testData])

    return (
        <Paper className='newTest'>
            <h3>Последний добавленный тест</h3>
            <div className='newTest_theTest'>
                {theTestBtn({ ...testData, imgBase64: poster ,
                handler:()=>history.push(`test-passing/${testData.testName}`)})}
            </div>
        </Paper>
    )
}
