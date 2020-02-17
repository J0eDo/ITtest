const notification = (state, action) => {
    let newState = { ...state }
    switch (action.type) {
        case "ADD_NOTIFICATION":
            newState.message = action.message
            return newState
        case "REMOVE_NOTIFICATION":
            newState.message = 0
            return newState
        default:
            return newState
    }
}

export default notification