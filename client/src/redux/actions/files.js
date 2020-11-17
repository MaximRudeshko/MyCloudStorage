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

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const response = await axios.post(`http://localhost:5001/api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                    }
                }
            });

            console.log(response)
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
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


