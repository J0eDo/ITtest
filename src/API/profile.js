import { axios, REGISTRATION, LOGIN } from './Axios'
import { showErrorRegistration, showErrorLogin } from '../until/ErrorAuth'

export const registration = dispatch => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const username = document.getElementById('username').value

    const registrated = async () => {
        await axios.get(REGISTRATION, {
            params: {
                email, password, username
            }
        }).then((response) => {
            const token = 'Bearer ' + response.data.accessToken.token
            dispatch({ type: 'AUTH', token })
        }).catch((error) => {
            showErrorRegistration(error.data[0])
        })
    }
    registrated()
}


export const login = dispatch => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const logined = async () => {
        console.log(email, password);
        await axios.get(LOGIN, {
            params: {
                email, password
            }
        }).then((response) => {
            const token = 'Bearer ' + response.data.token
            dispatch({ type: 'AUTH', token })
        }).catch(() => showErrorLogin())
    }
    logined()
}