import axios from 'axios';

const axios_url = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
})

export default axios_url