import Axios from 'axios'

export const axios = Axios.create({
    baseURL: 'http://185.87.194.11:3333/',
});

export const dataBaseNameOnServer =  {'Users':'users','Tasks':'the_tasks','Tests':'test' }



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


//Route
export const REGISTRATION = '/registration'
export const LOGIN = '/login'
export const ACCOUNT_INFO = '/accountInfo'
//Administrator
export const GET_DATA_BY_NAME = '/getDataByName'
export const REMOVE_DATA_BY_ID = '/removeDataByID'
export const BANED_UNBANED = '/userSuccess'
export const REMOVE_USER = '/userRemove'
//TasksConstructor
export const TASK = '/task'
export const SAVE_TASK = '/saveTask'

