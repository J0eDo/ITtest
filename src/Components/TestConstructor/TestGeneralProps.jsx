import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
//Material UI
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
//API
import { saveTest as save } from '../../API/testConstructor'
import { uploadFile, downloadPicture } from '../../API/fileAPI'
//Until
import { statusesTest, complexityLevel } from './TestConstructorSetting'
//Components
import { Selects, theTestBtn } from '../../Style/elements'
import Dropzone from 'react-dropzone'

let complexity_default

export default function TestGeneral(theTest) {
    theTest = theTest[0]
    const [isNewTest, setIsNewTest] = useState(true)
    const [complexity, setComplexity] = useState(2)
    const [statusTest, setStatusTest] = useState('new')
    const [testName, setTestName] = useState(theTest.testName || '')
    const [images, setImages] = useState()
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
        downloadPicture(setImages, '/tests/img/', theTest.testName + '.jpg')
        setTestName(theTest.testName)
        setStatusTest(theTest.status)
        setComplexity(theTest.complexity)
        complexity_default = theTest.complexity
    }, [theTest])

    const sendPicture = (picture) => {
        uploadFile(picture[0], '/tests/img/', theTest.testName)
            .then(() => downloadPicture(downloadPictureHandler, '/tests/img/', theTest.testName + '.jpg'))
    }

    const downloadPictureHandler = (data) => {
        setImages(data)
    }

    const setStatusHandler = event => {
        setStatusTest(event.target.value)
    }

    const selectStatusProps = {
        items: statusesTest,
        dataType: statusTest,
        setDataHandler: setStatusHandler
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
                    {theTestBtn({ complexity, testName, imgBase64: images })}
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
                                        {images ?
                                            <img src={`data:image/gif;base64,${images}`} alt="Постер" /> :
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
                >{isNewTest ? 'Update' : 'Save'}</Button>
            </div>
        </div>
    )
}
