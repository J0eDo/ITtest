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
    answer: {
        ADD: "ADD_ANSWER",
        CHANGE: "CHANGE_ANSWER",
        APPROWED: "APPROWED/UNAPPROWED_ANSWER",
        REMOVE: "REMOVE_ANSWER"
    }

}

export function columnConvert(column, dataType) {
    let columns
    switch (dataType) {
        case 'users':
            columns = { username: 'column2', email: 'column3', success: 'column4', ranc: 'column5' }
            return columns[column]
        case 'tests':
            columns = { testname: 'column2', type: 'column3', status: 'column4'}
            return columns[column]
        case 'answers':
            columns = { testID: 'column2', type: 'column3', status: 'column4' }
            return columns[column]
        default:
            alert("UNKNOWN DATA TYPE")
            break;
    }
}



export const ModeTable = {
    USER: {
        toolbarOption: {
            header: 'Users'
        },
        columns: [
            { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
            { id: 'column2', numeric: true, disablePadding: false, label: 'username' },
            { id: 'column3', numeric: true, disablePadding: false, label: 'em@il' },
            { id: 'column4', numeric: true, disablePadding: false, label: 'success' },
            { id: 'column5', numeric: true, disablePadding: false, label: 'ranc' },
        ],
        remote: [
            { id: actions.user.BANED, label: 'baned/unbaned', alwaysActiv: false, withDialog: true },
            { id: actions.user.REMOVE, label: 'Remove', alwaysActiv: false, withDialog: true },
        ]
    },
    ANSWER: {
        toolbarOption: {
            header: 'Answers'
        },
        columns: [
            { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
            { id: 'column2', numeric: true, disablePadding: false, label: 'testID' },
            { id: 'column3', numeric: true, disablePadding: false, label: 'type' },
            { id: 'column4', numeric: true, disablePadding: false, label: 'status' },
        ],
        remote: [
            { id: actions.answer.ADD, label: 'Add', alwaysActiv: true, withDialog: false },
            { id: actions.answer.CHANGE, label: 'Changed', alwaysActiv: false, withDialog: false },
            { id: actions.answer.REMOVE, label: 'Remove', alwaysActiv: false, withDialog: true },
        ]
    },
    TEST: {
        toolbarOption: {
            header: 'Tests'
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