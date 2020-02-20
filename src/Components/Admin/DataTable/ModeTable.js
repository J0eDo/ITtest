export const dataName = {
    USER: 'Users', THE_TASKS: 'Tasks', TEST_LIST: 'Tests'
}

export const dataNames = ['Users', 'Tasks', 'Tests']

export const dataBaseNameOnServer = { 'Users': 'users', 'Tasks': 'the_tasks', 'Tests': 'tests' }


export const actions = {
    user: {
        BANED: "BANED/UNBANED",
        REMOVE: "USER_REMOVE"
    },
    test: {
        ADD: "ADD_TEST",
        APPROWED: "APPROWED/UNAPPROWED_TEST",
        REMOVE: "REMOVE_TEST"
    },
    theTasks: {
        ADD: "ADD_TASK",
        CHANGE: "CHANGE_THE_TASK",
        APPROWED: "APPROWED/UNAPPROWED_TASK",
        REMOVE: "REMOVE_THE_TASK"
    }

}

const redirectPath = path => id=>path(id)

export function columnConvert(column, dataType) {
    let columns
    switch (dataType) {
        case dataName.USER:
            columns = { username: 'column2', email: 'column3', success: 'column4' }
            return columns[column]
        case dataName.TEST_LIST:
            columns = { testname: 'column2', type: 'column3', status: 'column4' }
            return columns[column]
        case dataName.THE_TASKS:
            columns = { testID: 'column2', type: 'column3', status: 'column4' }
            return columns[column]
        default:
            alert("UNKNOWN DATA TYPE")
            break;
    }
}



export const ModeTable = {
    [dataName.USER]: {
        toolbarOption: {
            header: dataName.USER
        },
        columns: [
            { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
            { id: 'column2', numeric: true, disablePadding: false, label: 'username' },
            { id: 'column3', numeric: true, disablePadding: false, label: 'em@il' },
            { id: 'column4', numeric: true, disablePadding: false, label: 'success' },
        ],
        remote: [
            { id: actions.user.BANED, label: 'baned/unbaned', alwaysActiv: false, withDialog: true },
            { id: actions.user.REMOVE, label: 'Remove', alwaysActiv: false, withDialog: true },
        ]
    },
    [dataName.THE_TASKS]: {
        toolbarOption: {
            header: dataName.THE_TASKS
        },
        columns: [
            { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
            { id: 'column2', numeric: true, disablePadding: false, label: 'testID' },
            { id: 'column3', numeric: true, disablePadding: false, label: 'type' },
            { id: 'column4', numeric: true, disablePadding: false, label: 'status' },
        ],
        remote: [
            { id: actions.theTasks.ADD, label: 'Add', alwaysActiv: true, 
            withDialog: false, path: redirectPath((id)=>`/task-constructor/new`) },
            { id: actions.theTasks.CHANGE, label: 'Changed', alwaysActiv: false, 
            withDialog: false, path: redirectPath((id)=>`/task-constructor/${id}`) },
            { id: actions.theTasks.REMOVE, label: 'Remove', alwaysActiv: false, withDialog: true },
        ]
    },
    [dataName.TEST_LIST]: {
        toolbarOption: {
            header: dataName.TEST_LIST
        },
        columns: [
            { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
            { id: 'column2', numeric: true, disablePadding: false, label: 'testname' },
            { id: 'column3', numeric: true, disablePadding: false, label: 'type' },
            { id: 'column4', numeric: true, disablePadding: false, label: 'status' },
        ],
        remote: [
            { id: actions.test.ADD, label: 'Add', alwaysActiv: true, withDialog: false },
            { id: actions.test.CHANGE, label: 'Changed', alwaysActiv: false, withDialog: false },
            { id: actions.test.REMOVE, label: 'Remove', alwaysActiv: false, withDialog: true },
        ]
    }
}