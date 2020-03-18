import React from 'react';
import { NavLink } from "react-router-dom";
import './style.scss'
//Material UI
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



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
export const Selects = ({defaultValue,setDataHandler,items,style}) => (
    <Select
        defaultValue={defaultValue}
        onChange={setDataHandler}
        style={style}
    >
        {
            items.map(element => (
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
        const classes = e.currentTarget.classList
        classes.add('theTestBlock_click')
        setTimeout(() => {
            classes.toggle('theTestBlock_click')
            if (handler) {
                handler()
            }
        }, 300);
    }
    return (
        <div className='theTestBlock' onClick={onClickBlock} key={testName}>
            {imgBase64 && <img src={`data:image/gif;base64,${imgBase64}`} alt='loading...'></img>}
            <p style={{ fontWeight: `${150 * (complexity + 1)}` }}>
                {testName}
            </p>
        </div>)
}



