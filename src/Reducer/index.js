import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { formatTable } from './Middlewars'
import auth from './auth'
import admin from './admin'


const reducer = combineReducers({
    admin,
    auth
})
const defaultState = () => {
    if (localStorage.getItem('token')) {
        return {
            auth: { isAuth: true },
            admin: {
                dataType: 'users',
                tableData: []
            }
        }
    }
}
export const store = createStore(reducer, defaultState(), composeWithDevTools(applyMiddleware(thunk, formatTable)));