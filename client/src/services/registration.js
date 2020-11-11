import axios from 'axios'

const registration = async (email, password, name, lastName) => {
    try {
        const res = await axios.post('http://localhost:5001/api/auth/registration', 
            {email, password, name, lastName}
    )

    alert(res.data.message)
    } catch (error) {
        alert(error)
    }
}

export default registration