import axios from 'axios'


const login = async (email, password) => {
    try {
        const res = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password
    })
    return res.data
    } catch (error) {
        console.log(error)
    }
}

export default login