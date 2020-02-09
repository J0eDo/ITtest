import React, { useState } from 'react'
import { selects } from '../../../Style/elements'
import requestFilterForm from './RequestFilterForm'


export default function RequestBody() {
    const [dataType, setData] = useState('users')
    const setDataHandler = event => {
        setData(event.target.value)
    }
    const selectProps = {
        dataType,
        setDataHandler,
        items: ['users', 'answers', 'tests'],
        selectID : 'selectDataType'
    }
    return (
        <div>
            <div className="rb_option">
                <p>DataType:</p>
                {selects(selectProps)}
            </div>
            {requestFilterForm(dataType)}
        </div>
    )
}
