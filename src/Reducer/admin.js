import {columnConvert} from '../Components/Admin/DataTable/ModeTable'

const admin = (state, action) => {
    let newState = { ...state }
    switch (action.type) {
        case "CHANGE_DATA_TYPE":
            newState.dataType = action.dataType
            return newState
        case "SET_TABLE_DATA":
            newState.tableData = action.tableData
            return newState
        case "CHANGE_TABLE_DATA":
            let changedElement = newState.tableData.find(element => element.id === action.idRow)
            const keyColumn = columnConvert(action.payload.column,state.dataType)
            changedElement[keyColumn] = action.payload.value
            newState.tableData = JSON.parse(JSON.stringify(newState.tableData))
            return newState
        default:
            return newState
    }
}

export default admin