//Libarys
import React from 'react'
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
import SnackBar from '../Snackbar/Snackbar'
import TaskConstructor from '../TaskConstructor/TaskConstructor'
import TestConstructor from '../TestConstructor/TestConstructor'




function App() {
    return (<ThemeProvider theme={theme}>
        <Router >
            <NavMenu />
            <main className="app">
                <Switch>
                    <Route exact path="/" component={GeneralPage} />
                    <Route path="/tests" component={TestsList} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/admin" component={AdminPage} />
                    <Route path="/task-constructor/:id" component={TaskConstructor} />
                    <Route path="/test-constructor/:id" component={TestConstructor} />
                </Switch>
            </main>
            <SnackBar />
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