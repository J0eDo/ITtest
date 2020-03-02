import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import { uploadPicture, downloadPicture } from '../../API/fileAPI'
import Dropzone from 'react-dropzone'
import { saveTest as save } from '../../API/testConstructor'
import { Selects, theTestBtn } from '../../Style/elements'
import { statusesTest, complexityLevel } from './TestConstructorSetting'
import { useParams, useHistory } from 'react-router-dom'



const pictureName = (testName, backgroundName) => `test_${testName}_Bg${backgroundName}`
let _images
let complexity_default
let testName_default

export default function TestGeneral(theTest) {
    theTest = theTest[0]
    const [isNewTest, setIsNewTest] = useState(true)
    const [complexity, setComplexity] = useState(2)
    const [statusTest, setStatusTest] = useState('new')
    const [testName, setTestName] = useState(theTest.testName || '')
    const [images, setImages] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    function saveHandler(data) {
        dispatch({ type: "ADD_NOTIFICATION", message: data.message })
        if (data.testID) {
            history.push(data.testID + "")
        }
    }

    useEffect(() => {
        let testIsEmpty = JSON.stringify(theTest) === '{}'
        setIsNewTest(!testIsEmpty)
        let fileName = pictureName(theTest.testName, 'poster')
        downloadPicture(downloadPictureHandler('poster'), fileName)
        setTestName(theTest.testName)
        setStatusTest(theTest.status)
        ///разобраться
        setComplexity(theTest.complexity)
        complexity_default = theTest.complexity
        testName_default = theTest.testName
        /////////////////////////////////

    }, [theTest])

    const sendPicture = (picture, imgLabel) => {
        const fileName = pictureName(testName, imgLabel)
        uploadPicture(picture[0], fileName, imgLabel)
            .then(() => downloadPicture(downloadPictureHandler(imgLabel), fileName))
    }

    const downloadPictureHandler = imgLabel => data => {
        _images = { ..._images, [imgLabel]: data.file }
        setImages(_images)
    }


    const setStatusHandler = event => {
        setStatusTest(event.target.value)
    }

    const selectStatusProps = {
        items: statusesTest,
        dataType: statusTest,
        setDataHandler: setStatusHandler,
    }

    const saveTest = () => {
        let dataTest = {}
        dataTest.id = id
        dataTest.testName = testName
        dataTest.complexity = complexity
        dataTest.status = statusTest
        save(dispatch, dataTest, saveHandler)
    }

    const setTestNameHandler = e => {
        setTestName(e.target.value)
    }

    return (
        <div className="test_generalSetting">
            {!isNewTest ? <h2>Создать новый</h2> : <h2>ID:{theTest.id}</h2>}
            <div className='testGeneral_conteiner'>
                <div className='theTest_constructed__conteiner'>
                    {theTestBtn({ complexity, testName, imgBase64: images.poster })}
                </div>
                <div className='middleSetting'>
                    <p>Сложность: {complexityLevel[complexity]}</p>
                    {(complexity_default || complexity_default === 0) && <Slider
                        defaultValue={complexity_default}
                        max={4}
                        getAriaValueText={setComplexity}
                        step={1}

                    />}
                    <TextField
                        style={{ margin: 'auto' }}
                        label={'введите название теста'}
                        onChange={(e) => setTestNameHandler(e)}
                        rows="1"
                        variant="filled"
                    />
                      {Selects(selectStatusProps)}  
                </div>
                {isNewTest &&
                    <div className='downloadBlock'>
                        <Dropzone onDrop={acceptedFiles => sendPicture(acceptedFiles, 'poster')}>
                            {({ getRootProps, getInputProps }) => (
                                <section className='poster'>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {images.poster ?
                                            <img src={`data:image/gif;base64,${images.poster}`} alt="Постер" /> :
                                            <div className='loadImg'>
                                                <div>Загрузите иконку</div>
                                            </div>
                                        }
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>}
            </div>
            <div className="lineRemote">
                <Button
                    onClick={saveTest}
                    variant="contained"
                    color="primary"
                    size="large"
                    color="primary" >{isNewTest ? 'Update' : 'Save'}</Button>
            </div>
        </div>
    )
}
