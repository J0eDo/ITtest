import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
//Material UI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
//Components
import { Selects } from '../../../Style/elements'
import { getDataWithFilter } from '../../../API/adminisrator'

function FilterForm(data) {
    const [dataType, setDataType] = useState(data.selectItems[0])
    const dispatch = useDispatch()
    const runRequest = getDataWithFilter(dispatch)
    const getFields = () => {
        return data.textFields.map(element => document.getElementById(`${element.label}`))
    }

    const filtersReset = () => {
        getFields().forEach(element => {
            element.value = ''
        });
        setDataType(data.selectItems[0])
    }

    const setDataHandler = event => {
        setDataType(event.target.value)
        enterRequest()
    }

    const selectProps = {
        items: data.selectItems,
        dataType,
        setDataHandler,
    }

    const enterRequest = () => {
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

    useEffect(() => {
        setDataType(data.selectItems[0])
        enterRequest()
    }, [data.selectItems])


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
                    Selects({
                        defaultValue: data.selectItems[0],
                        setDataHandler,
                        items:data.selectItems
                    })
                }
            </div>
            <Button variant="outlined" color="primary"
                style={{ marginRight: '1rem' }}
                onClick={enterRequest} startIcon={<SearchIcon />}
            >search</Button>
            <Button variant="outlined" color="primary"
                onClick={filtersReset} startIcon={<YoutubeSearchedForIcon />}
            >reset</Button>
        </React.Fragment>
    )
}

export default FilterForm