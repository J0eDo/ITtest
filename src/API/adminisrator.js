import {
    axios,
    GET_USERS,
    GET_TESTS,
    GET_ANSWERS,
    BANED_UNBANED,
    REMOVE_USER
} from './Axios'
import qs from 'querystring'

export let getDataWithFilter = dispatch => data => {
    let route;
    const getData = () => {
        switch (data.dataBaseName) {
            case 'users':
                route = GET_USERS
                break;
            case 'answers':
                route = GET_ANSWERS
                break;
            case 'tests':
                route = GET_TESTS
                break;
        }
        let fields = qs.stringify(data.fields)
        axios.get(route, {
            params: {
                ...data,
                fields
            }
        })
            .then((response) => {
                dispatch({ type: "SET_TABLE_DATA", tableData: response.data, table: data.dataBaseName })
            })
            .catch((error) => {
                console.log(error, "ERROR");
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
        })
        .catch((error) => {
            console.log(error, "ERROR");
        })
}

export let userRemove = id => {
    axios.get(REMOVE_USER, {
        params: {
            id
        }
    })
        .then((response) => {
            console.log(response.data);

        })
        .catch((error) => {
            console.log(error, "ERROR");
        })
}