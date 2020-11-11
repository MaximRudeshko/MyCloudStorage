import {createStore , compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers/rootReducer'


const composeEnhuncer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhuncer(
    applyMiddleware(thunk)
))


export default store