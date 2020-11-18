import {combineReducers} from 'redux'
import fileReducer from './fileReducer'
import uploaderReducer from './uploaderReducer'
import userReducer from './userReducer'


const rootReducer = combineReducers({
    files: fileReducer,
    user: userReducer,
    uploader: uploaderReducer
})

export default rootReducer