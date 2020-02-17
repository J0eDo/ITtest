import {
    axios, REGISTRATION,
    LOGIN, ACCOUNT_INFO
} from './Axios'
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
            if (response.data.accessToken) {
                const token = 'Bearer ' + response.data.accessToken.token
                dispatch({ type: 'AUTH', token })
                getUserData(dispatch)
            } else {
                showErrorRegistration(response.data[0])
            }
        }).catch((error) => {
            console.log(error);
            //ServerError
        })
    }
    registrated()
}


export const login = dispatch => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const logined = async () => {
        await axios.get(LOGIN, {
            params: {
                email, password
            }
        }).then((response) => {
            const token = 'Bearer ' + response.data.token
            dispatch({ type: 'AUTH', token })
            getUserData(dispatch)
        }).catch(() => showErrorLogin())
    }
    logined()
}

export const getUserData = async (dispatch) => {
    const getData = async () => {
        await axios.get(ACCOUNT_INFO)
        .then((response) => {
           dispatch({type:"GET_PROFILE", payload:response.data.userData})          
        })
        .catch((error) => {
            console.log(error,"ERROR");
        })
    }
    getData()
}