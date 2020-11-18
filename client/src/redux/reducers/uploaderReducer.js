const initialState = {
    files: [],
    isVisible: false
}


const uploaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_UPLOADER':
            return{
                ...state,
                isVisible: true
            }
        case 'HIDE_UPLOADER':
            return{
                ...state,
                isVisible: false
            } 
        case 'ADD_FILE_TO_UPLOADER':
            return{
                ...state,
                files: [...state.files, action.payload]
            }
        case 'REMOVE_FILE_FROM_UPLOADER':
            return{
                ...state,
                files: [...state.files, action.payload]
            }
        case 'CHANGE_UPLOAD_FILE': {
            return{
                ...state,
                files: [...state.files.map(file => file.id == action.payload.id
                    ? {...file, progress: action.payload.progress}
                    : {...file}
                )]
            }
        }   
        default:
            return state
    }
}


export default uploaderReducer