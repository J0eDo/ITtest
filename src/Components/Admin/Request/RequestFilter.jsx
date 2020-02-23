import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Selects } from '../../../Style/elements'
import { getDataWithFilter } from '../../../API/adminisrator'

function FilterForm(data) {
    const [dataType, setDataType] = useState(data.selectItems[0])
    const dispatch = useDispatch()
    const runRequest = getDataWithFilter(dispatch)
    const getFields = () => {
        return data.textFields.map(element => document.getElementById(`${element.label}`))
    }

    useEffect(()=>{
        setDataType(data.selectItems[0])
    },[data])

    


    const filtersReset = () => {
        getFields().forEach(element => {
            element.value = ''
        });
        setDataType(data.selectItems[0])
    }

    const setDataHandler = event => {
        setDataType(event.target.value)
        console.log(dataType);
    }

    const selectProps = {
        items: data.selectItems,
        dataType,
        setDataHandler,
        selectID: 'filterRequestData'
    }

    const enterRequest = () => {
        console.log(data);
        
        let body = {
            fields: []
        }
        getFields().forEach(element => {
            if (element.value) {
                body.fields[element.id] = element.value
            }
        }) 
        body.filter = dataType
        body.dataBaseName = data.dataBaseName
        dispatch({ type: "CHANGE_DATA_TYPE", dataType: data.dataBaseName })
        runRequest(body)
      

    }

    return (
        <React.Fragment>
            <div className="filterForm"
                id="filterForm">
                {data.textFields.map(element => (
                    <TextField
                        key={element.label + "textField" + data.dataBaseName}
                        className='filterForm_input'
                        id={`${element.label}`}
                        label={element.label}
                        variant="filled"
                    />
                ))}
                {
                    Selects(selectProps)
                }
            </div>
            <Button variant="outlined" color="primary"
                onClick={enterRequest}
            >search</Button>
            <Button variant="outlined" color="primary"
                onClick={filtersReset}
            >reset filter</Button>
        </React.Fragment>
    )
}

export default FilterForm