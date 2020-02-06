import { setJWT, removeJWT, defaultJWT } from '../API/Axios'


const auth = (state, action) => {
    let newState = { ...state }
    switch (action.type) {
        case "SET_AUTH_MODE":
            newState.mode = action.mode
            return newState
        case "AUTH":
            newState.isAuth = true
            newState.mode = null
            setJWT(action.token)
            return newState
        case "UNAUTHORIZATED":
            removeJWT()
            return {}
        case "GET_PROFILE":
            return newState = {
                ...state,
                ...action.payload
            }
        default:
            defaultJWT()
            return newState
    }
}

export default auth