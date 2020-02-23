import {
    axios,
    GET_DATA_BY_NAME,
    BANED_UNBANED,
    REMOVE_USER,
    REMOVE_DATA_BY_ID,
    UPLOAD_PIC,
    dataBaseNameOnServer,
    errorServer
} from './Axios'
import qs from 'querystring'

export let getDataWithFilter = dispatch => data => {
    const getData = () => {
        data.dataBaseName = dataBaseNameOnServer[data.dataBaseName]
        let fields = qs.stringify(data.fields)
        axios.get(GET_DATA_BY_NAME, {
            params: {
                ...data,
                fields
            }
        })
            .then((response) => {
                console.log(response.data, "NEWDATA");
                if (response.data.message) {
                    dispatch({ type: "ADD_NOTIFICATION", message: data.message })
                } else {
                    dispatch({ type: "SET_TABLE_DATA", tableData: response.data, table: data.dataBaseName })


                }

            })
            .catch((error) => {

            })
    }
    getData()
}

export let userBaned = (id, dispatch) => {
    axios.get(BANED_UNBANED, {
        params: {
            id
        }
    })
        .then((response) => {
            const { message, payload } = response.data
            if (payload) {
                dispatch({ type: "CHANGE_TABLE_DATA", payload, idRow: id })
            }
            dispatch({ type: "ADD_NOTIFICATION", message })
        })
        .catch(() => {
            errorServer(dispatch)
        })
}

export let userRemove = (dispatch, id) => {
    axios.get(REMOVE_USER, {
        params: {
            id
        }
    })
        .then((response) => {
            const message = response.data.message
            dispatch({ type: "ADD_NOTIFICATION", message })
            dispatch({ type: "REMOVE_TABLE_DATA", id })

        })
        .catch(() => {
            errorServer(dispatch)
        })
}


//Remove by id and data base name, except users
export let removeDataByID = (dispatch, id, dataName) => {
    let dataBaseName = dataBaseNameOnServer[dataName]
    return (axios.get(REMOVE_DATA_BY_ID, {
        params: {
            dataBaseName,
            id
        }
    })
        .then((response) => {
            const message = response.data.message
            dispatch({ type: "ADD_NOTIFICATION", message })
            dispatch({ type: "REMOVE_TABLE_DATA", id })

        })
        .catch(() => {
            errorServer(dispatch)
        }))
}

export const uploadPicture = file => {
    
    axios.get(UPLOAD_PIC,  file )
        .then((response) => {
            console.log(response);


        })
        .catch(() => {
           
        })
}

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('pic', file)
    return await axios.get(UPLOAD_PIC, formData);
}