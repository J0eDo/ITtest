import React, { useState } from 'react'
//Until
import { dataNames } from '../DataTable/ModeTable'
//Components
import { Selects } from '../../../Style/elements'
import requestFilterForm from './RequestFilterForm'


export default function RequestBody() {
    const [dataType, setData] = useState(dataNames[0])
    const setDataHandler = event => {
        setData(event.target.value)
    }
    const selectProps = {
        dataType,
        setDataHandler,
        items: dataNames,
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
