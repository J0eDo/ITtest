import {
    axios, errorServer,
    SAVE_TASK, TASK
} from './Axios'




export const saveTask = (dispatch, taskBody, id, type) => {
    taskBody = JSON.stringify(taskBody)
    console.log(taskBody,"INs");
    
    id = parseInt(id)
    axios.get(SAVE_TASK, {
        params: { taskBody, id ,type}
    })
        .then((response) => {
            const message = response.data.message
            dispatch({ type: "ADD_NOTIFICATION", message })
            if (response.data.id) {
                dispatch({ type: "NEW_TASK_ID", id: response.data.id })
            }
        })
        .catch(() => {
            errorServer(dispatch)
        })
}

export const getTask = (dispatch, id) => {
    id = parseInt(id)
    axios.get(TASK, {
        params: { id }
    })
        .then((response) => {
            if (response.data.message) {
                //not found
                dispatch({ type: "ADD_NOTIFICATION", message: response.data.message })
            } else {
                dispatch({ type: "SET_THE_TASK", theTask: response.data.task.body,server:true })
            }
        })
        .catch(() => {
            errorServer(dispatch)
        })
}