import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createPortal } from 'react-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { MenuBadge } from '../../Style/elements'
import { NavLink } from "react-router-dom";
import './navMenu.scss'
import AuthPanel from '../AuthorizationPanel'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isAuth = useSelector(state => state.auth.isAuth)
  const dispatch = useDispatch()
  const modeAuth = useSelector(state => state.auth.mode)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  function exitAccount() {
    handleClose()
    dispatch({ type: "UNAUTHORIZATED" })
  }

  function openAuthWindow(mode) {
    handleClose()
    dispatch({type: "SET_AUTH_MODE", mode })
  }

  const authProfileMenuItem = () => (
    <div>
      <MenuItem onClick={handleClose}>
        <NavLink to='/profile' className='navLink'>
          Профиль
        </NavLink>
      </MenuItem>
      <MenuItem onClick={exitAccount}>Выйти</MenuItem>
    </div>
  )
  const noAuthProfileMenuItem = () => (
    <div>
      <MenuItem onClick={()=>openAuthWindow(2)}>Войти</MenuItem>
      <MenuItem onClick={()=>openAuthWindow(1)}>Регистрация</MenuItem>
    </div>
  )

  function authWindow(state) {
    if(state)
      return createPortal(<AuthPanel/>, document.getElementById('second'))
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            IT-test
          </Typography>
          <div>
            {MenuBadge("Главная", "/")}
            {MenuBadge("Тесты", "/tests")}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              {
                isAuth ? authProfileMenuItem(null, handleClose) :
                  noAuthProfileMenuItem(null, handleClose)
              }
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {authWindow(modeAuth)}
    </div>
  );
}
