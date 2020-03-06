import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { theTestBtn } from '../../../Style/elements'
import { lastTest } from '../../../API/content'
import { downloadPicture } from '../../../API/fileAPI'
import { useHistory } from 'react-router-dom'
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
