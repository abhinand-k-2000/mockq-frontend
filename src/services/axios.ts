import axios from 'axios'


const Api = axios.create({
    baseURL: 'https://www.mockq.abhinandk.online/api',
    withCredentials: true
})



export default Api