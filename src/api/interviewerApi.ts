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
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

interface InterviewerDetails {
    yearsOfExperience: string;
    currentDesignation: string;
    organisation: string;
    collegeUniversity: string;
    introduction: string;
    profilePicture: File[];
    salarySlip: File[];
    resume: File[];
}

export const verifyDetails = async (interviewerDetails: InterviewerDetails) => {
    try {

        const formData = new FormData();
        for (const key in interviewerDetails) {
            if (interviewerDetails.hasOwnProperty(key)) {
                const value = interviewerDetails[key as keyof InterviewerDetails];
                if (key === 'profilePicture' || key === 'salarySlip' || key === 'resume') {
                    // formData.append(key, interviewerDetails[key][0]);
                    formData.append(key, (value as File[])[0]);

                } else {
                    // formData.append(key, interviewerDetails[key] );
                    formData.append(key, value as string);
                }
            }
        }
        // const response = await Api.post(interviewerEndpoint.verifyDetails, {interviewerDetails})

        const response = await Api.post(interviewerEndpoint.verifyDetails, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response);
        return response.data
    } catch (error) {
        console.log("Error in verifying details: ", error)
    }
}


export const logout = async () => {
    const response = await Api.post(interviewerEndpoint.logout)
    return response.data
}  