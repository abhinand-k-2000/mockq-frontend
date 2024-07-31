import axios from 'axios'


const Api = axios.create({
    // baseURL: 'https://www.mockq.abhinandk.online/api',
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})



export default Api