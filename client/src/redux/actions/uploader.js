export const showUploader = () => {
    return {
        type: 'SHOW_UPLOADER'
    }
}

export const hideUploader = () => {
    return {
        type: 'HIDE_UPLOADER'
    }
}


export const addFileToUploader = file => {
    return {
        type: 'ADD_FILE_TO_UPLOADER',
        payload: file
    }
}

export const removeFileFRomUploader = file => {
    return{
        type: 'REMOVE_FILE_FROM_UPLOADER',
        payload: file
    }
}

export const changeUploaderFile = file => {
    return {
        type: 'CHANGE_UPLOAD_FILE',
        payload: file
    }
}