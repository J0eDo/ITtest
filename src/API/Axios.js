import Axios from 'axios'

export const axios = Axios.create({
    baseURL: 'http://185.87.194.11:3333/',
});

//Route
export const REGISTRATION = '/registration'
export const LOGIN = '/login'

//Manage Auth
export const setJWT = (token) =>{
    axios.defaults.headers.common["Authorization"] = token
    localStorage.setItem('token', token)
}
export const removeJWT = ()=>{
    axios.defaults.headers.common["Authorization"] = null
    localStorage.removeItem('token')
}