const constructorTest = (state, action) => {
    let newState = { ...state }
    switch (action.type) {
        case "SET_ROW_TASK":
            newState.taskID = action.id
            newState.buttonAtive = action.buttonAtive
            return newState
        default:
            return newState
    }
}

export default constructorTest