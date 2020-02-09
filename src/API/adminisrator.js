import {
    axios,
    GET_USERS,
    GET_TESTS,
    GET_ANSWERS
} from './Axios'
import qs from 'querystring'

export let getDataWithFilter = dispatch => data => {
    let route;
    const getData = () => {
        switch (data.dataBaseName) {
            case 'users':
                route=GET_USERS
                break;
            case 'answers':
                route = GET_ANSWERS
                break;
            case 'tests':
                route = GET_TESTS
                break;
            default:
                alert('unknown route')
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
                console.log(response);
                /* 
                dispatch({ type: "GET_PROFILE", payload: response.data.userData }) */
            })
            .catch((error) => {
                console.log(error, "ERROR");
            })
    }
    getData()
}