import axios from 'axios'


const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const onLogin = (email, password) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5001/api/auth/login', {
            email, 
            password
        })
        dispatch(setUser(response.data.user))
        console.log(response.data)
        localStorage.setItem('token', response.data.token)
    } catch (error) {
        console.log(error)
        // catch errors....
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

export const logOut = () => {
    localStorage.removeItem('token')
    return{
        type: 'LOGOUT'
    }
}
