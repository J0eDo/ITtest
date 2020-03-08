import React, { useState, useEffect } from 'react';
import './style.scss'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";
import { createPortal } from 'react-dom'
import accessAdmin from '../HOC/Admin'
//API
import { getUserData } from '../../API/profile'
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import headMenu from '../../Content/img/headMenu.jpg'
import StarsIcon from '@material-ui/icons/Stars';
import EditIcon from '@material-ui/icons/Edit';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import StorageIcon from '@material-ui/icons/Storage';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LoginIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';

import Menu from '@material-ui/core/Menu';
//Components
import AuthPanel from '../AuthorizationPanel'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom:theme.spacing(2)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [anchorProfile, setAnchorProfile] = React.useState(null);
    const openProfile = Boolean(anchorProfile);
    const accessLevel = useSelector(state => state.auth.access)
    const isAuth = useSelector(state => state.auth.isAuth)
    const modeAuth = useSelector(state => state.auth.mode)

    const handleProfileMenu = event => {
        setAnchorProfile(event.currentTarget);
    }

    const handleCloseProfileMenu = () => {
        setAnchorProfile(null);
    }

    const exitAccount = () => {
        handleCloseProfileMenu()
        dispatch({ type: "UNAUTHORIZATED" })
    }

    const openAuthWindow = (mode) => {
        handleCloseProfileMenu()
        dispatch({ type: "SET_AUTH_MODE", mode })
    }

    const authWindow = (state) => {
        if (state)
            return createPortal(<AuthPanel />, document.getElementById('second'))
    }



    useEffect(() => {
        if (isAuth) {
            getUserData(dispatch)
        }
    }, [isAuth])

    const AdminPanel = () => (
        <React.Fragment>
            <Divider />
            <List>
                <ListItem button >
                    <ListItemIcon><StorageIcon /></ListItemIcon>
                    <ListItemText> <NavLink className='navLink' to='/admin'>
                        База данных</NavLink></ListItemText>
                </ListItem>
                <ListItem button >
                    <ListItemIcon><NoteAddIcon /></ListItemIcon>
                    <ListItemText>  <NavLink className='navLink' to='/test-constructor/:new'>
                        Создать тест</NavLink></ListItemText>
                </ListItem>
            </List>
        </React.Fragment>
    )

    const authProfileMenuItem = () => (
        <List>
            <ListItem onClick={handleCloseProfileMenu}>
                <NavLink to='/profile' className='navLink'>
                    Профиль
            </NavLink>
            </ListItem>
            <Divider />
            <MenuItem onClick={exitAccount}>
                <NavLink to='/' className='navLink'>
                    Выйти
            </NavLink></MenuItem>
        </List>
    )
    const noAuthProfileMenuItem = () => (
        <React.Fragment>
            <MenuItem onClick={() => openAuthWindow(2)}>Войти</MenuItem>
            <Divider />
            <MenuItem onClick={() => openAuthWindow(1)}>Регистрация</MenuItem>
        </React.Fragment>
    )

    return (
        <div className={classes.root}>
            <Drawer
                className='drawerMenu'
                open={isOpenMenu} onClick={() => setIsOpenMenu(false)}>
                <div className='drawerMenu_head'>
                    <img src={headMenu} alt="load..." />
                </div>
                <List>
                    <ListItem button >
                        <ListItemIcon><StarsIcon /></ListItemIcon>
                        <ListItemText>  <NavLink className='navLink' to='/'>
                            Главная</NavLink></ListItemText>
                    </ListItem>
                    <ListItem button >
                        <ListItemIcon><DoneAllIcon /></ListItemIcon>
                        <ListItemText>  <NavLink className='navLink' to='/tests'>
                            Тесты</NavLink></ListItemText>
                    </ListItem>
                    <ListItem button >
                        <ListItemIcon><EditIcon /></ListItemIcon>
                        <ListItemText>  <NavLink className='navLink' to='/task-constructor/:new'>
                            Конструктор</NavLink></ListItemText>
                    </ListItem>
                </List>
                {accessAdmin(AdminPanel, accessLevel)}
            </Drawer>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton}
                        onClick={() => setIsOpenMenu(true)}
                        color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        IT-tasker
                    </Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleProfileMenu}
                        color="inherit"
                    >
                        {isAuth ? <AccountCircle /> : <LoginIcon />}
                    </IconButton>
                    <Menu
                        anchorEl={anchorProfile}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openProfile}
                        onClose={handleCloseProfileMenu}
                    >
                        {
                            isAuth ? authProfileMenuItem() :
                                noAuthProfileMenuItem()
                        }
                    </Menu>
                </Toolbar>
            </AppBar>
            {authWindow(modeAuth)}
        </div>
    );
}