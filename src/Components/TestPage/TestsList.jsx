import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import './style.scss'
//Material UI
import { makeStyles } from '@material-ui/core/styles'
import { theTestBtn } from '../../Style/elements'
import Paper from '@material-ui/core/Paper';
//API
import { getTestBtns } from '../../API/passingTheTest'
import { downloadPicture } from '../../API/fileAPI'


const useStyles = makeStyles(theme => ({
    root: {
        margin: '.3rem',
    },
    paper: {
        MinHeight: '400px'
    }
}));

const pictureName = testName => `test_${testName}_Bgposter`


function TestList() {
    const classes = useStyles();
    const history = useHistory() 
    const [tests, setTests] = useState([])
    const [imgBase64, setImgBase64] = useState([])

    const getData = async () => {
        let data = await getTestBtns()
         setTests(data.tests) 
    }

    const getPosterTest = async () => {
        for (const test of tests) {
            const fileName = test.testName+'.jpg'
            await downloadPicture(setImg,'/tests/img/',fileName);
        }
    }

    const setImg = (data) => {
        imgBase64.push(data)
        setImgBase64(JSON.parse(JSON.stringify(imgBase64)))      
    }

    const passingTheTest = (data) => {
        history.push(`test-passing/${data}`) 
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getPosterTest()
    }, [tests])

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <h1>Список тестов</h1>
                <div className='testList'>
                    {tests.map((element, index) =>
                        theTestBtn({
                            ...element, imgBase64: imgBase64[index],
                            handler: ()=>passingTheTest(element.testName)
                        }))}
                </div>
            </Paper>
        </div>
    );
}

export default TestList