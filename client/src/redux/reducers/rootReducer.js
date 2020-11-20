import {combineReducers} from 'redux'
import fileReducer from './fileReducer'
import loaderReducer from './loaderReducer'
import uploaderReducer from './uploaderReducer'
import userReducer from './userReducer'


const rootReducer = combineReducers({
    files: fileReducer,
    user: userReducer,
    uploader: uploaderReducer,
    loader: loaderReducer
})

export default rootReducer