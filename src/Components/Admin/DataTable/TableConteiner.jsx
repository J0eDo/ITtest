import React from 'react'
import DataTable from './Table'
import { useSelector } from 'react-redux'
import { ModeTable,dataName } from './ModeTable'

export default function TableConteiner() {
    const dataEnterType = useSelector(state => state.admin.dataType)
    const Options = (dataEnterType) => {
        switch (dataEnterType) {
            case dataName.USER:
                return ModeTable[dataName.USER]
            case dataName.THE_TASKS:
                return ModeTable[dataName.THE_TASKS]
            case dataName.THE_TASKS:
                return ModeTable[dataName.THE_TASKS]
            default: break;
        }
    }
    return <DataTable option={Options(dataEnterType)} />
}
