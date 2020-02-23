import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import ImageUploader from 'react-images-upload';
import { uploadPicture, uploadFile } from '../../API/adminisrator'
import axios, { post } from 'axios';

export default function TestGeneral() {
    const [file, setFile] = useState()
    const dispatch = useDispatch()
    /* function onDrop(picture) {
        uploadPicture(picture)
    } */

    function onChange(e) {
        setFile(e.target.files[0])
    }

    function fileUpload(file) {
        const url = 'http://185.87.194.11:3333/uploadPic';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    function onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        fileUpload(file).then((response) => {
            console.log(response.data);
        })
    }

    return (
        <div>
            <div className='testGeneral_conteiner'>
                <div>
                    <TextField
                        style={{ margin: 'auto' }}
                        label={'название теста'}
                        multiline
                        rows="1"
                        variant="filled"
                    />
                    <img src={file}></img>
                </div>
                <div className='middleSetting'>
                    <p>Сложность</p>
                    <Slider
                        defaultValue={5}
                        max={5}
                        /*  getAriaValueText={valuetext} */
                        aria-labelledby="discrete-slider-always"
                        step={1}
                        /*    marks={marks} */
                        valueLabelDisplay="auto"
                    />
                </div>
                <div>
                   {/*  <div className='downloadBlock'> */}
                        <form onSubmit={onFormSubmit}>
                            <h1>File Upload</h1>
                            <input type="file" onChange={onChange} />
                            <button type="submit">Upload</button>
                        </form>
                        {/*      <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        /> */}
                {/*     </div> */}

                </div>
            </div>
            <div className="lineRemote">
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    color="primary" >Save</Button>
            </div>
        </div>
    )
}
