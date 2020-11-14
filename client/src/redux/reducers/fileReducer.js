const initialState = {
    files: [],
    currentDirectory: null
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
        default:
            return state
    }
}


export default fileReducer