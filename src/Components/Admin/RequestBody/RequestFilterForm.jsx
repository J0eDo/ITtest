import React from 'react'
import FilterForm from './RequestFilter'
import { Checkbox } from '@material-ui/core'

const typeInput = { textField: 'textField', checkBox: 'checkBox' }

const elementsUser = {
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
    selectItems :[
        'All',
        'Admins',
        'Banlist'
    ],
    dataBaseName:'users'
}
const elementsTest = {
    textFields: [
        {
            label: 'id'
        },
        {
            label: 'testname'
        },
        {
            label: 'tag'
        }],
        selectItems :[
            'All',
            'finished',
            'not finished', 
        ],
        dataBaseName:'tests'
}
const elementsAnswer = {
    textFields: [
        {
            label: 'id'
        },
        {
            label: 'testname'
        }],
        selectItems :[
            'All',
            'approved',
            'not approved',
            'wait approved'
        ],
        dataBaseName:'answers'
}

const RequestDatabaseForm = (type) => {
    switch (type) {
        case 'users':
            return FilterForm(elementsUser, type)
        case 'answers':
            return FilterForm(elementsAnswer, type)
        case 'tests':
            return FilterForm(elementsTest, type)
        default:
            return <p>Error data type!</p>
    }
}

export default RequestDatabaseForm
