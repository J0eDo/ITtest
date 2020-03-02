import Axios from 'axios'

export const axios = Axios.create({
    baseURL: 'http://185.87.194.11:3333/',
});

export const dataBaseNameOnServer = { 'Users': 'users', 'Tasks': 'the_tasks', 'Tests': 'tests' }

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

export const errorServer = (dispatch) => {
    const message = {
        severity: 'error',
        title: 'Server Errror'
    }
    dispatch({type: "ADD_NOTIFICATION", message})
}


//                      Route                           \\
//Authorization
export const REGISTRATION = '/registration'
export const LOGIN = '/login'
export const ACCOUNT_INFO = '/accountInfo'
//Administrator
export const GET_DATA_BY_NAME = '/getDataByName'
export const REMOVE_DATA_BY_ID = '/removeDataByID'
export const BANED_UNBANED = '/userSuccess'
export const REMOVE_USER = '/userRemove'
//Tasks/Tests Constructor
export const TASK = '/task'
export const SAVE_TASK = '/saveTask'
export const UPLOAD_PIC = '/uploadPic'
export const GET_IMG = '/img'
export const SAVE_TEST = '/saveTest'
export const GET_TEST = '/getTest'
export const GET_FREE_TASK = '/freeTasks'
export const ATTACH_TASK = '/attachTask'
export const DETACH_TASK = '/dettachTask'
//Passing the test
export const GET_TEST_LIST = '/getTestList'
export const GET_THE_TEST = '/getTheTest'