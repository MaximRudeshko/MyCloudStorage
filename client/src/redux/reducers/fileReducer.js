const initialState = {
    files: [],
    currentDirectory: null,
    isPopupVisible: false
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
                currentDirectory: action.paylod
            }
        case 'ADD_FILE':
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        case 'SET_POPUP_VISIBLE': {
            return {
                ...state,
                isPopupVisible: action.payload

            }
        }
        default:
            return state
    }
}


export default fileReducer