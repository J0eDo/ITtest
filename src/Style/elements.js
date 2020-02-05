import React from 'react';
import { NavLink } from "react-router-dom";
import './style.scss'
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';


//NavMenu
export const MenuBadge = (title, link) => (
    <Badge className="bar_element" color="primary">
        <NavLink to={link} className='navLink'>
            <Button className='btn'>{title}</Button>
        </NavLink>
    </Badge>
)



