let resultTest = []

const constructorTheTask = (state, action) => {
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
        case "SET_THE_TASK_TEST":
            newState.theTaskTestName = action.theTaskTestName
            return newState
        case "PREVIEW":
            newState.preview = action.preview
            return newState
        case "NEW_TASK_ID":
            newState.newTaskID = action.id
            return newState
        case "SET_VARIANT":
            newState.isCorrectly = action.isCorrectly
            newState.btnNextActive = action.btnNextActive
            return newState
        case "NEXT_TASK":
            newState.correctlyAnswer += +newState.isCorrectly
            return newState
        case "RESULT":
            newState.result = [newState.correctlyAnswer, action.numTasks]
            return newState
        default:
            newState.newTaskID = undefined
            newState.taskType = "Test"
            newState.theTask = undefined
            newState.preview = false
            newState.resultTest = resultTest
            newState.correctlyAnswer = 0
            newState.theTaskTestName = ''
            return newState
    }
}

export default constructorTheTask