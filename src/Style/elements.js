import React from 'react';
import { NavLink } from "react-router-dom";
import './style.scss'
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


export const MenuBadge = (title, link) => (
    <Badge className="bar_element" color="primary">
        <NavLink to={link} className='navLink'>
            <Button className='btn'>{title}</Button>
        </NavLink>
    </Badge>
)

export const InfoCard = (Component) => (
    <Paper className="infoCard">
        <Component />
    </Paper>
)

export const Selects = (prop) => (
    <Select
        style={{
            minWidth: '13rem',
        }}
        id={prop.selectID}
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




