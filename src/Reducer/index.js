import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './auth'


const reducer = combineReducers({
    auth
})
const defaultState = () => {
    if (localStorage.getItem('token')) {
        return {
            auth: { isAuth: true }
        }
    }
}
export const store = createStore(reducer, defaultState(), composeWithDevTools(applyMiddleware(thunk)));