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

export const getInterviewersByTech = async (tech: string) => {
    try {
        const response = await Api.get(candidateEndpoint.getInterviewersByTech, {params: {tech}})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getInterviewerSlotDetails = async (interviewerId: string, techName: string) => {
    try {
        const response = await Api.get(candidateEndpoint.getInterviewerSlotDetails + `/${interviewerId}`, {
            params: {techName}
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const makePayment = async (data: any, previousUrl: string)=> {
    try {
        const response = await Api.post(candidateEndpoint.makePayment, {data, previousUrl})
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const getScheduledIinterviews = async (page: number, limit: number) => {
    try {
        const response = await Api.get(candidateEndpoint.getScheduledInterviews+`?page=${page}&limit=${limit}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const forgorPassword = async(email: string) => {
    try {
        const response = await Api.post(candidateEndpoint.forgorPassword, {email})
        console.log(response.data)
        localStorage.setItem("resetPassword", response.data.data)
        return response.data
    } catch (error: any) {
        console.log(error)
        return error.response.data
    }
}

export const resetPassword = async (otp: string, password: string) => {
    try {
        const token = localStorage.getItem("resetPassword")
        const response = await Api.post(candidateEndpoint.resetPassword, {otp, password}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response.data.success){
            localStorage.removeItem("resetPassword")
        }
        return response.data
    } catch (error: any) {
        console.log("inseide catch in api: ", error.response.data)
        return error.response.data
    }
}

export const getFeebackDetails = async (interviewId: string) => {
    try {
        console.log('id; ', interviewId)
        const response = await Api.get(candidateEndpoint.getFeebackDetails, {params: {interviewId}})
        console.log(response)
        return response.data

    } catch (error: any) {
        console.log(error)
        return error.response.data
    }
}


export const isCandidatePremium = async () => {
    try {
        const response = await Api.get(candidateEndpoint.isCandidatePremium)
        return response.data
    } catch (error: any) {
        console.log(error)
        return error.response.data
    }
}

export const getAllPremiumCandidates = async (search: string) => {
    try {
        const {data} = await Api.get(candidateEndpoint.getAllPremiumCandidates, {params: {search}})
        return data
    } catch (error) {
        console.log(error)
    }
}


export const createGroup = async (chatName: string, users: string) => { // types edited
    try {
        const {data} = await Api.post(candidateEndpoint.createGroup, {chatName, users})
        return data
    } catch (error) {
        console.log(error)
    }
}


export const getAllChats = async () => {
    try {
        const {data} = await Api.get(candidateEndpoint.getAllChats)
        return data
    } catch (error) {
        console.log(error)
    }
}           

export const getAllMessages = async (chatId: string) => {
    try {
        const {data} = await Api.get(candidateEndpoint.getAllMessages + "/" + chatId);
        return data
    } catch (error) {
        console.log(error)
    }
}

export const saveMessage = async (content: string, chatId: string) => {
    try {
        const {data} = await Api.post(candidateEndpoint.sendMessage, {content, chatId})
        return data
    } catch (error) {
        console.log(error)
    }
}

export const giveInterviewerRating = async (interviewerId: string, interviewId: string, rating: number, comment: string) => {
    try {
        const {data} = await Api.post(candidateEndpoint.giveInterviewerRating, {interviewId, interviewerId, rating, comment})
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getAnalytics = async () => {
    try {
        const {data} = await Api.get(candidateEndpoint.getAnalytics)
        return data
    } catch (error) {
        console.log(error)   
    }
}

export const verifyCandidateVideoConference = async (roomId: string, userId: string) => {
    try {
        const {data} = await Api.post(candidateEndpoint.verifyCandidateVideoConference, {roomId, userId})
        return data
    } catch (error: any) {
        console.log(error)
        return error.response.data
    }
}

export const getNotifications = async () => {
    try {
        const {data} = await Api.get(candidateEndpoint.getNotifications)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getProfileDetails = async() => {
    try {
        const {data} = await Api.get(candidateEndpoint.getProfileDetails)
        return data
    } catch (error) {
        console.log(error)
    }
}


export const editProfile = async (formData: any) => {
    try {
        const {data} = await Api.put(candidateEndpoint.editProfile, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          return data
    } catch (error) { 
        console.log(error)
    }
}


export const editPassword = async (currentPassword: string, newPassword: string) => {
    try {
        const {data} = await Api.put(candidateEndpoint.editPassword, {currentPassword, newPassword})
        return data 
    } catch (error: any) {
        console.log(error)
        return error.response.data
    }
}