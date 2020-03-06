import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux'
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles({
    table: {
        width: '100%',
    },
});


export default function TableTheTask(props) {
    const [rows, setRows] = useState([])
    const setedID = useSelector(state=>state.constructorTest.taskID)
    const classes = useStyles();
    const dispatch = useDispatch()
    useEffect(() => {
        setRows(props.dataTable)
    }, [props])

    const setRow = e => {
        let id = parseInt(e.currentTarget.getAttribute('value'))
        dispatch({
            type: 'SET_ROW_TASK', id,
            buttonAtive:  props.headName === 'Пулл задач'?'attach':'dettach'
        })
    }

    const styleRow = (setedID, rowID) => {
        if (setedID === rowID) {
            return 'changedRow'
        }
    }

    return (
        <div style={{ width: '95%', minHeight: '300px' }}>
            <h3>{props.headName}</h3>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell align="right">type</TableCell>
                        <TableCell align="right">create</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map(row => (
                        <TableRow key={row.id} value={row.id} onClick={setRow}
                            className={styleRow(setedID, row.id)}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.created_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}