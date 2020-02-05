import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './auth'


const reducer = combineReducers({
    auth
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));