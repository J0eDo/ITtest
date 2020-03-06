import React from 'react'
import { useSelector } from 'react-redux'
//Components
import DataTable from './Table'
//Until
import { ModeTable, dataName } from './ModeTable'

export default function TableConteiner() {
    const dataEnterType = useSelector(state => state.admin.dataType)
    const Options = (dataEnterType) => {
        switch (dataEnterType) {
            case dataName.USER:
                return ModeTable[dataName.USER]
            case dataName.THE_TASKS:
                return ModeTable[dataName.THE_TASKS]
            case dataName.TEST_LIST:
                return ModeTable[dataName.TEST_LIST]
            default: break;
        }
    }
    return <DataTable option={Options(dataEnterType)} />
}
