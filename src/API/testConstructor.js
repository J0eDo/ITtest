import {
    axios, SAVE_TEST,
    GET_TEST, GET_FREE_TASK,
    ATTACH_TASK, DETACH_TASK,
    errorServer
} from './Axios'

export const saveTest = (dispatch, saveData, handler) => {
    axios.get(SAVE_TEST, {
        params: { saveData }
    })
        .then((response) => {
            handler(response.data)
        })
        .catch(() => {
            errorServer(dispatch)
        })
}

export const getFreeTask = (dispatch, testID, handler) => {
    axios.get(GET_FREE_TASK, {
        params: { testID }
    })
        .then((response) => {
            handler(response.data)
        })
        .catch(() => {
            errorServer(dispatch)
        })
}

export const attachedTask = (testID, dispatch) => taskID => {
    axios.get(ATTACH_TASK, {
        params: { testID, taskID }
    })
        .then((response) => {
            dispatch({ type: 'SET_ROW_TASK' })
        })
        .catch(() => {
            errorServer(dispatch)
        })
}

export const dettachedTask = (dispatch, taskID) => {
    axios.get(DETACH_TASK, {
        params: { taskID }
    })
        .then((response) => {
            dispatch({ type: 'SET_ROW_TASK' })
        })
        .catch(() => {
            errorServer(dispatch)
        })
}


export const getTestByID = (dispatch, id) => {
    return axios.get(GET_TEST, { params: { id } })
}