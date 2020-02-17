import {
    axios,
    SAVE_TASK,
    TASK
} from './Axios'



export const saveTask = (dispatch,taskBody,id) =>{
    taskBody = JSON.stringify(taskBody)
    id = parseInt(id)
    axios.get(SAVE_TASK, {
        params: {taskBody,id}
    })
        .then((response) => {
            const message = response.data.message
            dispatch({ type: "ADD_NOTIFICATION", message })
        })
        .catch((error) => {

        })
}

export const getTask = (dispatch,id) =>{
    id = parseInt(id)
    axios.get(TASK, {
        params: {id}
    })
        .then((response) => {
            console.log(response.data)        
        })
        .catch((error) => {

        })
}