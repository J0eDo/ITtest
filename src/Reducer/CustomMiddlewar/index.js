import { dataBaseNameOnServer as dataName } from '../../Components/Admin/DataTable/ModeTable'

function createFormatUser(id, column2, column3, column4, column5) {
    return { id, column2, column3, column4, column5 };
}


export const formatTable = store => next => action => {
    switch (action.type) {
        case "SET_TABLE_DATA":
            action = normalizeDataAdminTable(action)
            break;
        default:
            break;
    }
    return next(action)
}

function normalizeDataAdminTable(action) {
    const data = action.tableData.result
    const table = action.table
    const payload = []
    switch (table) {
        case dataName.Users:
            data.forEach(element => {
                let { id, username, email, success } = element
                if (success === 0) {
                    success = "baned"
                } else if (success === 1) {
                    success = "user"
                } else {
                    success = "admin"
                }
                payload.push(createFormatUser(id, username, email, success))
            });
            action.tableData = payload
            break;
        case dataName.Tasks:
            data.forEach(element => {
                const { id, test_id, type, status } = element

                payload.push(createFormatUser(id, test_id || "not included", type, status || "Wait approwed"))
            });
            action.tableData = payload
            break;
        case dataName.Tests:
            data.forEach(element => {
                const { id, testName, complexity, status } = element
                payload.push(createFormatUser(id, testName, complexity, status))
            });
            action.tableData = payload
            break;
        default: break;
    }
    return action
}