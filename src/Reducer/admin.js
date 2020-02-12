

const admin = (state, action) => {
    let newState = { ...state }
    switch (action.type) {
        case "CHANGE_DATA_TYPE":
            newState.dataType = action.dataType
            return newState
        case "SET_TABLE_DATA":
            newState.tableData = action.tableData
            return newState
        default:
            return newState
    }
}

export default admin