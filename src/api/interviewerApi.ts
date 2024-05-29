import Api from "../services/axios";

import interviewerEndpoint from "../services/endpoints/interviewerEndpoint";


export const signup = async(name: string, email: string, mobile: number, password: string) => {
    try {
        const response = await Api.post(interviewerEndpoint.interviewerSignUp, {name, email, mobile, password})
        const token =  response.data.data;
        localStorage.setItem("interviewerOtp", token)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const verifyOtp = async(otp: string) => {
    try {
        let token = localStorage.getItem('interviewerOtp')
        const response = await Api.post(interviewerEndpoint.verifyOtp, {otp}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response.data.success){
            localStorage.removeItem('interviewerOtp')
        }
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const resendOtp = async() => {
    try {
        const token = localStorage.getItem('interviewerOtp')
        const response = await Api.post(interviewerEndpoint.resendOtp, '', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const newToken = response.data.token;
        localStorage.setItem('interviewerOtp', newToken)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const verifyLogin = async (email: string, password: string) => {
    try {
        const response = await Api.post(interviewerEndpoint.verifyLogin, {email, password})
        console.log("response: ", response);
        return response
    } catch (error) {
        console.log(error)
    }
}