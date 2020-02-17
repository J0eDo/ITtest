import React, { useState } from 'react'
import { Selects } from '../../../Style/elements'
import requestFilterForm from './RequestFilterForm'
import {dataNames} from '../DataTable/ModeTable'


export default function RequestBody() {
    const [dataType, setData] = useState(dataNames[0])
    const setDataHandler = event => {
        setData(event.target.value)
    }
    const selectProps = {
        dataType,
        setDataHandler,
        items: dataNames,
        selectID: 'selectDataType'
    }
    return (
        <div>
            <div className="rb_option">
                <p>DataType:</p> {Selects(selectProps)}
            </div>
            {requestFilterForm(dataType)}
        </div>
    )
}
