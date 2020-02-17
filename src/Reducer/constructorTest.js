const constructorTest = (state, action) => {
    let newState = { ...state }
    switch (action.type) {
        case "INPUTS_LINKS":
            newState.inputLinks = action.inputLinks
            return newState
        case "THE_TASK_TYPE":
            newState.taskType = action.taskType
            return newState
        default:
            newState.taskType= "Test"
            return newState
    }
}

export default constructorTest