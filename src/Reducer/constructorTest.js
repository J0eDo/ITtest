const constructorTest = (state, action) => {
    let newState = { ...state }
    switch (action.type) {
        case "SET_BODY_VALUE":
            newState.body = action.body
            newState.taskLoadedServer = action.server
            return newState
        case "THE_TASK_TYPE":
            newState.taskType = action.taskType
            return newState
        case "SET_THE_TASK":
            newState.theTask = JSON.parse(JSON.stringify(action.theTask))
            return newState
        case "PREVIEW":
            newState.preview = action.preview
            return newState
        case "NEW_TASK_ID":
            newState.newTaskID = action.id
            return newState

        default:
            newState.newTaskID = undefined
            newState.taskType = "Test"
            newState.theTask = undefined
            newState.preview = false
            return newState
    }
}

export default constructorTest