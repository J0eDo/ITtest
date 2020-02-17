import { columnConvert } from '../Components/Admin/DataTable/ModeTable'

const admin = (state, action) => {
    let newState = { ...state }
    switch (action.type) {        
        case "SET_TARGET_ID":
            newState.targetID = action.id
            return newState
        case "CHANGE_DATA_TYPE":
            newState.dataType = action.dataType
            return newState
        case "SET_TABLE_DATA":
            newState.tableData = action.tableData
            return newState
        case "CHANGE_TABLE_DATA":
            let changedElement = newState.tableData.find(element => element.id === action.idRow)
            const keyColumn = columnConvert(action.payload.column, state.dataType)
            changedElement[keyColumn] = action.payload.value
            newState.tableData = JSON.parse(JSON.stringify(newState.tableData))
            return newState
        case "REMOVE_TABLE_DATA":
            let filterData = newState.tableData.filter(element => element.id !== action.id)
            newState.tableData = [...filterData]
            return newState
        default:
            return newState
    }
}

export default admin