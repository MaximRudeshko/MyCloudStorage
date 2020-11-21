const initialState = {
    currentUser: {},
    isAuth:false,
    view: 'list'
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case 'LOGOUT': 
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case 'SET_VIEW':
            return {
                ...state,
                view: action.payload
            }
        default:
            return state
    }
}

export default userReducer