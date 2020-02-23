import React from 'react';
import TableTheTask from './TableTheTask'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';



export default function AddedTheTask() {

    const propsPull = {
        headName:'Pull'
    }

    const propsTest = {
        headName:'Test Name'
    }

    return (
        <div className='lineConteiner'>
            <div className='tableConteiner'>
                <TableTheTask {...propsTest}/>
            </div>
            <div className='remote'>
                <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    variant="contained"
                    className='remote_btns'
                >
                    <Button>+</Button>
                    <Button>-</Button>
                </ButtonGroup>
            </div>
            <div className='tableConteiner'>
                <TableTheTask {...propsPull}/>
            </div>
        </div>
    )
}