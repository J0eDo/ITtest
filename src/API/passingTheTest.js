import {
    axios,
    GET_TEST_LIST, GET_THE_TEST
} from './Axios'

export const getTestBtns = async () => {
    let res = await axios.get(GET_TEST_LIST)
    let { data } = res
    return await data
}

export const getTestTask = async (testName) => {
    let res = await axios.get(GET_THE_TEST, { params: { testName } })
    let { data } = res
    return await data
}