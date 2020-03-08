//Libarys
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,Route
} from "react-router-dom"
import './app.scss'
//UI
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../../Style/theme'

//Components
import Menu from '../NavMenu/Menu'
import NavMenu from '../NavMenu/NavMenu'
import GeneralPage from '../GeneralPage/GeneralPage'
import Profile from '../Profile/Profile'
import TestsList from '../TestPage/TestsList'
import AdminPage from '../Admin'
import SnackBar from '../Snackbar/Snackbar'
import TaskConstructor from '../TaskConstructor/TaskConstructor'
import TestConstructor from '../TestConstructor/TestConstructor'
import PassingTest from '../TestPage/PassingTest'
import ResultPage from '../ResultPage/ResultPage'




function App() {
    return (<ThemeProvider theme={theme}  className="app">
        <Router >
            <Menu />
            <main>
                <Switch>
                    <Route exact path="/" component={GeneralPage} />
                    <Route path="/tests" component={TestsList} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/admin" component={AdminPage} />
                    <Route path="/task-constructor/:id" component={TaskConstructor} />
                    <Route path="/test-constructor/:id" component={TestConstructor} />
                    <Route path="/test-passing/:testName" component={PassingTest} />
                    <Route path="/resultTest" component={ResultPage} />
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