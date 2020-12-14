import axios from 'axios'
import { hideLoader, showLoader } from './loader'


export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const logOut = () => {
    localStorage.removeItem('token')
    return{
        type: 'LOGOUT'
    }
}

export const setView = value => {
    return {
        type: 'SET_VIEW',
        payload: value
    }
}


export const registration = async (email, password, name, lastName) => {
    try {
        const res = await axios.post('http://localhost:5001/api/auth/registration', {
            email,
            password,
            name,
            lastName
        }
    )

    alert(res.data.message)
    //need create component with notification about ...
    } catch (error) {
        alert(error)
    }
}





export const onLogin = (email, password) => async dispatch => {
    dispatch(showLoader())
    try {
        
        const response = await axios.post('http://localhost:5001/api/auth/login', {
            email, 
            password
        })
        console.log(response.data)
        dispatch(setUser(response.data.user))
        localStorage.setItem('token', response.data.token)
    } catch (error) {
        console.log(error)
        dispatch(hideLoader())
        // catch errors....
    } finally {
        dispatch(hideLoader())
    }
}

export const onAuth = () => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:5001/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
        localStorage.setItem('token', response.data.token)
        dispatch(setUser(response.data.user))
    } catch (error) {
        localStorage.removeItem('token')
        console.log(error)
        //catch errors...
    }
}


export const uploadAvatar = (file) => async (dispatch) => {
    try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await axios.post(`http://localhost:5001/api/files/avatar`, formData, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        console.log(formData, response.data)
        dispatch(setUser(response.data.user))
    } catch (error) {
        console.log(error)
    }
}

export const deleteAvatar = () => async dispatch => {
    try {
        const response = await axios.delete('http://localhost:5001/api/files/avatar', {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        dispatch(setUser(response.data.user))
    } catch (error) {
        console.log(error.response.data.message)
    }
}


