import { SET_AUTH_MODE } from './actionNames'
const defaultState = {
    mode: null
}

const auth = (state = defaultState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case "SET_AUTH_MODE":
            newState.mode = action.mode
            return newState
        case "AUTH":
            newState.isAuth = true
            return newState
        case "UNAUTHORIZATED":
            newState.isAuth = false
            return newState
        default:
            return newState
    }
}

export default auth