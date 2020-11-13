import axios from 'axios'


export const getFiles = async dirId => {
    try {
        const response = await axios.get(`http://localhost:5001/api/files${dirId ? '?parent=' + dirId : ''}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return response.data
    } catch (error) {
        console.log(error)   
    }
}

