import Api from "../services/axios";

import candidateEndpoint from "../services/endpoints/candidateEndpoint";



export const signup = async(name: string, email: string, mobile: number, password: string) => {
    try {
        const response = await Api.post(candidateEndpoint.candidateSignUp, {name, email, mobile, password})
        const token = response?.data.token
        localStorage.setItem("candidateOtp", token)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const verifyOtp = async (otp: string) => {
    try {
        const token = localStorage.getItem('candidateOtp')

        const response = await Api.post(candidateEndpoint.verifyOtp, {otp}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log("response: ", response)
        if(response?.data.success){

            localStorage.removeItem('candidateOtp')
        }

        return response

    } catch (error) {
        console.log(error)
    }
}

export const verifyLogin = async (email: string, password: string) => {
    try {
        const response = await Api.post(candidateEndpoint.verifyLogin, {email, password})
        return response;
    } catch (error: any) {
        if(error.response){
            return error.response
        }
        console.log(error)
    }
}

export const resendOtp = async () => {
    try {
        const token = localStorage.getItem('candidateOtp')
        const response = await Api.post(candidateEndpoint.resendOtp, '', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log("response data: ", response.data)
        console.log("response: ", response)
        const newToken = response.data.token;
        localStorage.setItem("candidateOtp", newToken)
        return response
    } catch (error) {

        console.log(error)
    }
}

export const logout = async() => {
    try {
        const response = await Api.post(candidateEndpoint.logout)
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const home = async () => {
    try {
        const response = await Api.get(candidateEndpoint.home)
        return response.data
    } catch (error) {
        console.log(error)
    }
}