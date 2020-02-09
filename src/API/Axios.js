import Axios from 'axios'

export const axios = Axios.create({
    baseURL: 'http://185.87.194.11:3333/',
});

//Route
export const REGISTRATION = '/registration'
export const LOGIN = '/login'
export const ACCOUNT_INFO = '/accountInfo'
//Administrator
export const GET_USERS = '/getUsers'
export const GET_TESTS = '/getTests'
export const GET_ANSWERS = '/getAnswers'


//Manage Auth
export const setJWT = (token) => {
    axios.defaults.headers.common["Authorization"] = token
    localStorage.setItem('token', token)
}
export const removeJWT = () => {
    axios.defaults.headers.common["Authorization"] = undefined
    localStorage.removeItem('token')
}
export const defaultJWT = () => {
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers.common["Authorization"] = token
    }
}