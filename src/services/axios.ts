import axios from 'axios'
import store from '../redux/store'
import { candidateLogout, setBlockedStatus } from '../redux/slice/authSlice'


const Api = axios.create({
    // baseURL: 'https://www.mockq.abhinandk.online/api',
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})


export const setupInterceptors = (navigate: any) => {
    Api.interceptors.response.use(
        (response) => response, 
        async(error) => {
            if(error.response && error.response.status === 403) {
                const state = store.getState();
                const {candidateInfo}= state.auth
                if(candidateInfo){
                    // store.dispatch(setBlockedStatus(true))
                    console.log('inside interceptor: ', candidateInfo)
                    store.dispatch(candidateLogout())
                    alert("your account has been blocked. You have been logged out.")
                    navigate('/candidate/login')
                }
            }
            return Promise.reject(error)
        }
    )
}


export default Api