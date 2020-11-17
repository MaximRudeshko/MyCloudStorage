import axios from 'axios'

const setFiles = files => {
    return {
        type: 'SET_FILES',
        payload: files
    }
}

export const addFile = file => {
    return {
        type: 'ADD_FILE',
        payload: file
    }
}

 export const createFile = (name, parent) => async dispatch =>  {

    try {
        const response = await axios.post('http://localhost:5001/api/files', {
            name,
            type: 'dir',
            parent
        }, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})

        dispatch(addFile(response.data))
    } catch (error) {
        console.log(error)
    }

}


export const fetchFiles = dirId => async dispatch =>  {
    try {
        const response = await axios.get(`http://localhost:5001/api/files${dirId ? '?parent=' + dirId : ''}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        dispatch(setFiles(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const setPopupVisible = val => {
    return {
        type: 'SET_POPUP_VISIBLE',
        payload: val
    }
}

export const setCurrentDir = dirId => {
    return{
        type: 'SET_CURRENT_DIRECTORY',
        payload: dirId
    }
}

export const pushToStack = dirId => {
    return {
        type: 'PUSH_DIR_TO_STACK',
        payload: dirId
    }
}




/* export const getFiles = async dirId => {
    try {
        const response = await axios.get(`http://localhost:5001/api/files${dirId ? '?parent=' + dirId : ''}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return response.data
    } catch (error) {
        console.log(error)   
    }
}


export const fetchFiles = dirId => dispatch => {
    getFiles()
        .then(data => dispatch(setFiles(data)))
        .catch(e => console.log(e))
} */


