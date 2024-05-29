import axios from 'axios'


const Api = axios.create({
    baseURL: 'http://localhost:3000/api',
    // timeout: 1000,
    withCredentials: true
})



export default Api