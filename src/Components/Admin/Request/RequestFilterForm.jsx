import React from 'react'
import FilterForm from './RequestFilter'
import { dataName } from '../DataTable/ModeTable'
const userFilter = {
    textFields: [
        {
            label: 'id'
        },
        {
            label: 'email'
        },
        {
            label: 'username'
        }],
    selectItems: [
        'All users',
        'Admins',
        'Banlist'
    ],
    dataBaseName: dataName.USER
}

const theTasksFilter = {
    textFields: [
        {
            label: 'id'
        },
        {
            label: 'testname'
        }],
    selectItems: [
        'All task',
        'approved',
        'not approved',
    ],
    dataBaseName: dataName.THE_TASKS
}

const testListFilter = {
    textFields: [
        {
            label: 'id'
        },
        {
            label: 'testName'
        },
        {
            label: 'tag'
        }],
    selectItems: [
        'All tests',
        'finished',
        'not finished',
    ],
    dataBaseName: dataName.TEST_LIST
}

const RequestDatabaseForm = (type) => {
    switch (type) {
        case dataName.USER:
            return FilterForm(userFilter, type)
        case dataName.THE_TASKS:
            return FilterForm(theTasksFilter, type)
        case dataName.TEST_LIST:
            return FilterForm(testListFilter, type)
        default:
            return <p>Error data type!</p>
    }
}

export default RequestDatabaseForm
