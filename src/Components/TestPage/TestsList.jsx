import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import './style.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
//Material UI
import { makeStyles } from '@material-ui/core/styles'
import { theTestBtn } from '../../Style/elements'
import Paper from '@material-ui/core/Paper';
//API
import { getTestBtns } from '../../API/passingTheTest'
import { downloadPicture } from '../../API/fileAPI'
//Content
import kermit from '../../Content/img/kermet.jpg'
import knowledgeIMG from '../../Content/img/knows.jpg'
import oneLightIMG from '../../Content/img/oneLight.jpg'


const useStyles = makeStyles(theme => ({
    root: {
        margin: '.3rem',
    },
    paper: {
        MinHeight: '400px'
    }
}));



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
            const fileName = test.testName + '.jpg'
            await downloadPicture(setImg, '/tests/img/', fileName);
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
                    {tests.map((element, index) => (
                        <div className="theTestBtnShadow">
                            {theTestBtn({
                                ...element, imgBase64: imgBase64[index],
                                handler: () => passingTheTest(element.testName)

                            })}
                        </div>))}
                    <img className='testList_BG' src={kermit} alt="" />
                </div>
            </Paper>
            <div className='testList_carousel__conteiner'>
                <h3>Тестовые задания это</h3>
                <Carousel className='testList_carousel'
                    autoPlay={true} centerMode={false}
                    infiniteLoop={true} showThumbs={false}>
                    {/*    <div>
                        <img src={kermit}/>
                        <p className="legend">Выявить слабые места</p>
                    </div> */}
                    <div>
                        <img src={knowledgeIMG} />
                        <p className="legend">Получить субьективную оценку своих теоретических знаний</p>
                    </div>
                    <div>
                        <img src={oneLightIMG} />
                        <p className="legend">Подготовка перед собеседованием</p>
                    </div>
                </Carousel>
            </div>
        </div >
    );
}

export default TestList