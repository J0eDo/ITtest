import {
    axios,
    GET_LAST_TEST
} from './Axios'


export const lastTest = async () => {
    const res = await axios.get(GET_LAST_TEST)
    let { data } = res
    return await data
}