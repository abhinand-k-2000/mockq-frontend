
import Api from "../services/axios";

import adminEndpoint from "../services/endpoints/adminEndpoint";

export const verifyLogin = async (email: string, password: string) => {
    try {
        const response = await Api.post(adminEndpoint.adminLogin, {email, password})
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getCandidates = async (page: number, limit: number) => {
    try {
        const response = await Api.get(adminEndpoint.getCandidates + `?page=${page}&limit=${limit}`);
        return response.data
    } catch (error) {
        console.error('Error fetching candidates:', error);
    }
}

export const getInterviewers = async (page: number, limit: number) => {
    try {
        const response = await Api.get(adminEndpoint.getInterviewers + `?page=${page}&limit=${limit}`);
        return response.data
    } catch (error) {
        console.log("Error fetching interviewrs: ", error)
    }
}

export const getInterviewerDetails = async (id: string) => {
    try {
        const response = await Api.get(adminEndpoint.getInterviewerDetails+`/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const blockCandidate = async (candidateId: string) => {
    try {
        const response = await Api.put(adminEndpoint.blockCandidate+`/${candidateId}`)
        return response.data
    } catch (error) {
        console.log("Error blocking candidate", error)
    }
}

interface stackData {
    stackName: string,
    technologies: string[]
}

export const addStack = async (stackData: stackData) => {
    try {
        const {stackName, technologies} = stackData
        const response = await Api.post(adminEndpoint.addStack, {stackName, technologies})
        return response.data
    } catch (error: any) {
        console.log("Error adding stack", error)
        if (error.response) {
            console.log(error.response)
            return error.response.data; 
        } else {
            throw new Error('Failed to add stack');
        }
    }
}

export const getStacks = async (page: number, limit: number) => {
    try {
        const response = await Api.get(adminEndpoint.getStacks + `?page=${page}&limit=${limit}`)
        return response.data
    } catch (error) {
        console.log("Error fetching stacks")
    }
}

export const approveInterviewer = async (interviewerId: string) => {
    try {
        const response = await Api.put(adminEndpoint.approveInterviewer+`/${interviewerId}`)
        return response
    } catch (error) {
        console.log("Error in approving interviewer")
    }
}

export const logout = async () => {
    try {
        const response = await Api.post(adminEndpoint.logout)
        return response.data
    } catch (error) {
        console.log(error)
    }
}    


export const unlistStack = async (stackId: string) => {
    try {
        const response = await Api.put(adminEndpoint.unlistStack + `/${stackId}`)
        console.log("resp: ", response)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getInterviews = async (page: number, limit: number) => {
    try {
        const {data} = await Api.get(adminEndpoint.getInterviews + `?page=${page}&limit=${limit}`)
        return data 
    } catch (error) {
        console.log(error)
    }
}

export const getDashboardDetails = async () => {
    try {
        const {data} = await Api.get(adminEndpoint.getDashboardDetails)
        return data
    } catch (error) {
        console.log(error)
    }
}
