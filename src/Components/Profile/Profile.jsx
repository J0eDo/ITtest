import React, { useEffect, useState, useRef } from 'react';
import './style.scss'
import { useDispatch } from 'react-redux'
//Material UI
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
//API
import { uploadFile } from '../../API/fileAPI'
import { getUserProfile, reworkToken } from '../../API/profile'
//Component
import defaultAvatar from '../../Content/img/programmer_ava.jpg'





function Profile() {
    const [user, setUser] = useState()
    const [avatarFile, setAvatarFile] = useState()
    const dispatch = useDispatch()
    const oldPassword = useRef()
    const newPassword = useRef()
    const passwords = {}

    useEffect(() => {
        getUserProfile(setUser, setAvatarFile)
    }, [])


    const uploadAvatar = async (file) => {
        await uploadFile(file, '/avatar/', user.username)
        await getUserProfile(setUser, setAvatarFile)
    }

    const refreshPassword = () => {
        reworkToken(passwords,dispatch)
        oldPassword.current.value = ''
        newPassword.current.value = ''
    }

    return (
        <div>
            <h1>Профиль</h1>
            <Paper className='profile'>
                <div className='profile_info'>
                    <div className='profile_ava'>
                        <img
                            style={{ width: '200px', height: '250px' }}
                            src={avatarFile || defaultAvatar} alt="avatar" />
                        <Button
                            variant='contained'
                            style={{ height: '45px' }}>
                            <div>
                                <input type="file"
                                    className='dropzone_btn'
                                    onChange={e => uploadAvatar(e.target.files[0])}
                                />  загрузить фото
                            </div>
                        </Button>
                    </div>
                    <div className='profile_block'>
                        <p><small>ID:{user && user.id}</small><br />
                            <strong>{user && user.username}</strong><br />
                            <small>создан: {user && user.created_at.split(' ')[0]}</small>
                        </p>
                        <div className="profile_password">
                            <div className='profile_password__form'>
                                <TextField
                                    ref={oldPassword}
                                    onChange={e => passwords.oldPassword = e.target.value}
                                    type='password' label="старый пароль" variant="outlined" />
                                <TextField
                                    ref={newPassword}
                                    label="новый пароль" variant="outlined"
                                    onChange={e => passwords.newPassword = e.target.value}
                                />
                            </div>
                            <p id='errorReg'></p>
                            <Button variant='contained' color='primary'
                                onClick={refreshPassword}
                            >OK</Button>
                        </div>
                    </div>
                </div>
            </Paper>
            <h2 className='profile_passingTest__title'>Пройденные тесты</h2>
            <Paper className='passingTests'>
                <div>
                    <h2>Пусто</h2>
                </div>
            </Paper>
        </div>
    );
}

export default Profile