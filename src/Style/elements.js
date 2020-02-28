import React from 'react';
import { NavLink } from "react-router-dom";
import './style.scss'
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';


export const MenuBadge = (title, link) => (
    <Badge className="bar_element" color="primary">
        <NavLink to={link} className='navLink'>
            <Button className='btn'>{title}</Button>
        </NavLink>
    </Badge>
)

export const InfoCard = (Component, ...props) => (
    <Paper className="infoCard">
        <Component {...props} />
    </Paper>
)

export const SuccessCard = (Component) => (
    <Paper className="successCard">
        <Component />
    </Paper>
)
export const Selects = (prop) => (
    <Select
        style={{
            minWidth: '13rem',
        }}
        value={prop.dataType}
        onChange={prop.setDataHandler}
    >
        {
            prop.items.map(element => (
                <MenuItem key={`menuitem-${element}`} value={element}>{element}</MenuItem>
            ))
        }
    </Select>
)

export const SimpleCheckbox = (props) => (
    <FormControlLabel
        control={
            <Checkbox
                checked={props.value}
                onChange={() => props.setValue(!props.value)}
            />
        }
        label={props.label}
    />
)

export const theTestBtn = ({ complexity, testName, imgBase64, handler }) => {

    const onClickBlock = e => {
        const classes =  e.currentTarget.classList
       classes.add('theTestBlock_click')
        setTimeout(() => {
           classes.toggle('theTestBlock_click')
            if(handler){
                handler()
            }
        }, 500);
    }
    return (
        <div className='theTestBlock' onClick={onClickBlock}>
            {imgBase64 && <img src={`data:image/gif;base64,${imgBase64}`} ></img>}
            <p style={{ fontWeight: `${150 * (complexity + 1)}` }}>
                {testName}
            </p>
        </div>)
}



