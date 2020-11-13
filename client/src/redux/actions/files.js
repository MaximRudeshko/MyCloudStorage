import {getFiles} from '../../services/files'

const setFiles = files => {
    return {
        type: 'SET_FILES',
        payload: files
    }
}


export const fetchFiles = dirId => dispatch => {
    getFiles()
        .then(data => dispatch(setFiles(data)))
        .catch(e => console.log(e))
}


