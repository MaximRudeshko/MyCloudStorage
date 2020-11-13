import auth from "../../services/auth"
import login from "../../services/login"



const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const onLogin = (email, password) => dispatch => {
     login(email, password).then(data => {
        dispatch(setUser(data.user))
        localStorage.setItem('token', data.token)
    })
}

export const onAuth = () => dispatch => {
    auth()
    .then(data => {
         dispatch(setUser(data.user))
    })
    .catch((e) => console.log(e))
}

export const logOut = () => {
    localStorage.removeItem('token')
    return{
        type: 'LOGOUT'
    }
}
