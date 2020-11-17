const initialState = {
    files: [],
    currentDirectory: null,
    isPopupVisible: false,
    dirStack: []
}


const fileReducer = (state = initialState, action) => {


    switch (action.type) {
        case 'SET_FILES':
            return {
                ...state,
                files: action.payload
            }
        case 'SET_CURRENT_DIRECTORY':
            return {
                ...state,
                currentDirectory: action.payload
            }
        case 'ADD_FILE':
            return {
                ...state,
                files: [...state.files, action.payload]
            }
            
        case 'SET_POPUP_VISIBLE': 
            return {
                ...state,
                isPopupVisible: action.payload
            }
        case 'PUSH_DIR_TO_STACK': 
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload]
            }
        default:
            return state
    }
}


export default fileReducer