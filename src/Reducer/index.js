import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { formatTable } from './CustomMiddlewar'
import auth from './auth'
import admin from './admin'
import notification from './notification'
import constructorTheTask from './constructorTheTask'
import constructorTest from './constructorTest'


const reducer = combineReducers({
    admin,
    auth,
    notification,
    constructorTheTask,
    constructorTest
})
const defaultState = () => {
    if (localStorage.getItem('token')) {
        return {
            auth: { isAuth: true },
            admin: {
                dataType: 'Users',
                tableData: []
            }
        }
    }
}
export const store = createStore(reducer, defaultState(), composeWithDevTools(applyMiddleware(thunk, formatTable)));