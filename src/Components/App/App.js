//Libarys
import React, { useSelector, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
//UI
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../../Style/theme'
import './app.scss'
//Components
import NavMenu from '../NavMenu/NavMenu'
import GeneralPage from '../GeneralPage/GeneralPage'
import Profile from '../Profile/Profile'
import TestsList from '../TestPage/TestsList'
import AdminPage from '../Admin'




function App() {
    return (<ThemeProvider theme={theme}>
        <Router >
            <NavMenu />
            <main className="app">
                <Switch>
                    <Route exact path="/" component={GeneralPage} />
                    <Route exact path="/tests" component={TestsList} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/admin" component={AdminPage} />
                </Switch>
            </main>
            <footer>
                <div className="footer_contacts">
                    <p>noreduard93@gmail.com</p>
                    <a href="https://github.com/J0eDo">github.com/J0eDo</a>
                    <p>+7(995)312-98-05</p>
                </div>
            </footer>
        </Router>
    </ThemeProvider>
    );
}

export default App;