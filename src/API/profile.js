import {
    axios, REGISTRATION,
    LOGIN, ACCOUNT_INFO,
    GET_PROFILE, REWORK_TOKEN,
    errorServer
} from './Axios'
import { showErrorRegistration, showErrorLogin } from '../until/ErrorAuth'

export const registration = dispatch => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const username = document.getElementById('username').value
    axios.get(REGISTRATION, {
        params: {
            email, password, username
        }
    }).then((response) => {
        if (response.data.accessToken) {
            const token = 'Bearer ' + response.data.accessToken.token
            dispatch({ type: 'AUTH', token })
            dispatch({
                type: "ADD_NOTIFICATION", message: {
                    severity: 'success',
                    title: `Вы вошли`
                }
            })
            getUserData(dispatch)
        } else {
            showErrorRegistration(response.data[0])
        }
    }).catch(() => {
        errorServer(dispatch)
    })
}


export const login = dispatch => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    axios.get(LOGIN, {
        params: {
            email, password
        }
    }).then((response) => {
        const token = 'Bearer ' + response.data.token
        dispatch({ type: 'AUTH', token })
        getUserData(dispatch)
        dispatch({
            type: "ADD_NOTIFICATION", message: {
                severity: 'success',
                title: `Вы вошли`
            }
        })
    }).catch(() => showErrorLogin())

}

export const getUserData = dispatch => {
    axios.get(ACCOUNT_INFO)
        .then((response) => {
            dispatch({ type: "GET_PROFILE", payload: response.data.userData })
        })
        .catch(() => {
            errorServer(dispatch)
        })

}

export const getUserProfile = async (setUser, setAvatar) => {
    let res = await axios.get(GET_PROFILE)
    setUser(res.data.user)
    if (res.data.file) {
        setAvatar('data:image/gif;base64,' + res.data.file)
    }
}

export const reworkToken = async ({ oldPassword, newPassword }, dispatch) => {
    try {
        let res = await axios.get(REWORK_TOKEN, { params: { oldPassword, newPassword } })
        if (Array.isArray(res.data)) {
            showErrorRegistration(res.data[0])
        } else {
            showErrorRegistration({})
            dispatch({
                type: "ADD_NOTIFICATION", message: {
                    severity: 'success',
                    title: `Пароль изменен`
                }
            })
        }
    } catch (error) {
        errorServer(dispatch)
    }
}

