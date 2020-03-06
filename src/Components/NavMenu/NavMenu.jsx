//Libarys
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createPortal } from 'react-dom'
import { NavLink } from "react-router-dom";
//API
import { getUserData } from '../../API/profile'
//UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { MenuBadge } from '../../Style/elements'
import './navMenu.scss'
import LoginIcon from '@material-ui/icons/ExitToApp';
import Fade from '@material-ui/core/Fade';
//Components
import AuthPanel from '../AuthorizationPanel'
import { Button, Badge } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '1rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavMenu() {
  const classes = useStyles();
  const [anchorProfile, setAnchorProfile] = React.useState(null);
  const openProfile = Boolean(anchorProfile);
  const [anchorAdmin, setAnchorAdmin] = React.useState(null);


  const dispatch = useDispatch()
  const modeAuth = useSelector(state => state.auth.mode)
  const isAuth = useSelector(state => state.auth.isAuth)
  const accessLevel = useSelector(state => state.auth.access)

  useEffect(() => {
    if (isAuth) {
      getUserData(dispatch)
    }
  }, [dispatch, isAuth])


  const handleProfileMenu = event => {
    setAnchorProfile(event.currentTarget);
  }

  const handleCloseProfileMenu = () => {
    setAnchorProfile(null);
  }

  const handleCloseAdminMenu = () => {
    setAnchorAdmin(null);
  }

  const handleAdminMenu = event => {
    setAnchorAdmin(event.currentTarget);
  }


  function exitAccount() {
    handleCloseProfileMenu()
    dispatch({ type: "UNAUTHORIZATED" })
  }

  function openAuthWindow(mode) {
    handleCloseProfileMenu()
    dispatch({ type: "SET_AUTH_MODE", mode })
  }


  const authProfileMenuItem = () => (
    <div>
      <MenuItem onClick={handleCloseProfileMenu}>
        <NavLink to='/profile' className='navLink'>
          Профиль
        </NavLink>
      </MenuItem>
      <MenuItem onClick={exitAccount}>
        <NavLink to='/' className='navLink'>
          Выйти
        </NavLink></MenuItem>
    </div>
  )
  const noAuthProfileMenuItem = () => (
    <div>
      <MenuItem onClick={() => openAuthWindow(2)}>Войти</MenuItem>
      <MenuItem onClick={() => openAuthWindow(1)}>Регистрация</MenuItem>
    </div>
  )

  function authWindow(state) {
    if (state)
      return createPortal(<AuthPanel />, document.getElementById('second'))
  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            IT-tasker
          </Typography>
          <div>
            {accessLevel > 1 && <Button onClick={handleAdminMenu}
              className='btn'>Администрация</Button>}
            {MenuBadge("Главная", "/")}
            {MenuBadge("Тесты", "/tests")}
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
            < Menu
              anchorEl={anchorAdmin}
              getContentAnchorEl={null}
              keepMounted
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              variant='selectedMenu'
              TransitionComponent={Fade}
              open={Boolean(anchorAdmin)} onClose={handleCloseAdminMenu}>
              <MenuItem onClick={handleCloseAdminMenu}>
                <NavLink className='navLink' to='/admin'> База данных</NavLink> </MenuItem>
              <MenuItem onClick={handleCloseAdminMenu}>
                <NavLink className='navLink' to='/task-constructor/:new/'> Создать задание</NavLink></MenuItem>
              <MenuItem onClick={handleCloseAdminMenu}>
                <NavLink className='navLink' to='/test-constructor/:new'> Создать тест</NavLink></MenuItem>
            </Menu >
          </div>
        </Toolbar>
      </AppBar>
      {authWindow(modeAuth)}
    </div>
  );
}
