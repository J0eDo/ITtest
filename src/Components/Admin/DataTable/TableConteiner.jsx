import React from 'react'
import DataTable from './Table'
import { useSelector, useDispatch } from 'react-redux'
import { ModeTable } from './ModeTable'
const dataTypes = { users: 'users', answers: 'answers', tests: 'tests' }

export default function TableConteiner() {
    const dataEnterType = useSelector(state => state.admin.dataType)
    const Options = (dataEnterType) => {
        switch (dataEnterType) {
            case dataTypes.users:
                return ModeTable.USER
            case dataTypes.answers:
                return ModeTable.ANSWER
            case dataTypes.tests:
                return ModeTable.TEST
        }
    }
    return <DataTable option={Options(dataEnterType)} />
}
