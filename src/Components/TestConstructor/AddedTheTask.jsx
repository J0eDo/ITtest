import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
//Material UI
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
//API
import { getFreeTask, attachedTask, dettachedTask } from '../../API/testConstructor'
//Components
import TableTheTask from './TableTheTask'

export default function AddedTheTask(theTest) {
    theTest = theTest[0]
    const dispatch = useDispatch()
    const [freeTask, setFreeTask] = useState([])
    const [selfTask, setSelfTask] = useState([])
    const [buttonActiv,setButtonActiv] = useState([true,true])
    const selectedTaskID = useSelector(state => state.constructorTest.taskID)
    const activBtn = useSelector(state=>state.constructorTest.buttonAtive)

    useEffect(() => {
        getFreeTask(dispatch, theTest.id, dataTableHandler)
        return ()=> dispatch({type:'SET_ROW_TASK'})
    }, [theTest,dispatch])

    useEffect(() => {
        if(activBtn==='attach'){
            setButtonActiv([false,true])
        }else if(activBtn === 'dettach'){
            setButtonActiv([true,false])
        }else{
            setButtonActiv([true,true])
        }
    }, [activBtn])

    const transactionTable = (_donor, _recipient, elementID) => {
        let element = _donor.filter(Element => Element.id === elementID)
        let donor = _donor.filter(Element => Element.id !== elementID)  
        donor = JSON.parse(JSON.stringify(donor))
        let recipient = JSON.parse(JSON.stringify(_recipient))
        recipient.push(element[0])
        return { donor, recipient }
    }

    const dataTableHandler = data => {
        const { _freeTask, _selfTask } = data
        setFreeTask(_freeTask)
        setSelfTask(_selfTask)
    }


    const attachTaskBinded = attachedTask(theTest.id, dispatch)
    const propsPull = {
        headName: 'Пулл задач',
        dataTable: freeTask
    }

    const propsTest = {
        headName: theTest.testName,
        dataTable: selfTask
    }

    const attachTheTask = () => {
        attachTaskBinded(selectedTaskID);
        const { donor, recipient } = transactionTable(freeTask, selfTask, selectedTaskID)
        setSelfTask(recipient)
        setFreeTask(donor)
    }
    const detachTheTask = () => {
        dettachedTask(dispatch, selectedTaskID)
        const { donor, recipient } = transactionTable(selfTask, freeTask, selectedTaskID)
        setSelfTask(donor)
        setFreeTask(recipient)
    }

    return (
        <div className='lineConteiner'>
            <div className='tableConteiner'>
                <TableTheTask {...propsTest} />
            </div>
            <div className='remote'>
                <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    variant="contained"
                    className='remote_btns'
                >
                    <Button 
                    disabled={buttonActiv[0]}
                    onClick={attachTheTask}>&#8678;</Button>
                    <Button 
                    disabled={buttonActiv[1]}
                    onClick={detachTheTask}>&#8680;</Button>
                </ButtonGroup>
            </div>
            <div className='tableConteiner'>
                <TableTheTask {...propsPull} />
            </div>
        </div>
    )
}