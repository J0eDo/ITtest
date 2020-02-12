function createFormat(id, column2, column3, column4, column5) {
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

function normalizeDataAdminTable(action){
    const data = action.tableData.result
    const table = action.table
    const payload = []
    switch (table) {
        case 'users':
            data.forEach(element => {
                const { id, username, email, success } = element
                const rank = element.profile.rank
                payload.push(createFormat(id, username, email, success, rank))
            });
            action.tableData = payload
            break;
        case 'answers':
            data.forEach(element => {
                const { id, username, email, success } = element
                const rank = element.profile.rank
                payload.push(createFormat(id, username, email, success, rank))
            });
            action.tableData = payload
            break;
        case 'tests':
            data.forEach(element => {
                const { id, username, email, success } = element
                const rank = element.profile.rank
                payload.push(createFormat(id, username, email, success, rank))
            });
            action.tableData = payload
             break;
    }
    return action
}