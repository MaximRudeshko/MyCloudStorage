import axios from 'axios'

 const auth = async () => {

        try {
            const response = await axios.get(`http://localhost:5001/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            localStorage.setItem('token', response.data.token)

            return response.data
        } catch (e) {
            localStorage.removeItem('token')
        }
    }

    export default auth


