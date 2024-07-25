import axios from 'axios'


const Api = axios.create({
    baseURL: 'https://www.mockq.abhinandk.online/api',
    // timeout: 1000,
    withCredentials: true
})



export default Api