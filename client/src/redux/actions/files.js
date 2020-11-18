import axios from 'axios'
import { addFileToUploader, changeUploaderFile, showUploader } from './uploader'

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

export const uploadFile = (file, dirId) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            dispatch(showUploader()) 
            dispatch(addFileToUploader(uploadFile))
            

            const response = await axios.post(`http://localhost:5001/api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploaderFile(uploadFile))
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

export const downloadFile = async (file) =>  {
    const response = await fetch(`http://localhost:5001/api/files/download?id=${file._id}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })

    if(response.status === 200){
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove() 
    }
}

export const deleteFile = (file) => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:5001/api/files?id=${file._id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(deleteFileAction(file._id))
        alert(response.data.message)

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

const deleteFileAction = file => {
    return {
        type: 'DELETE_FILE',
        payload: file
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


