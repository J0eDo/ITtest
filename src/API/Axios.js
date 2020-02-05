import Axios from 'axios'


export const axios = Axios.create({
    baseURL: 'http://185.87.194.11:3333/',
});



//Route
export const REGISTR = 'registr'
export const LOGIN = 'login'

//Manage Auth
export const setJWT = () =>{}
export const removeJWT = ()=>{}