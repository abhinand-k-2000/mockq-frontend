import { BiSolidCommentDetail } from "react-icons/bi";
import Api from "../services/axios";

import interviewerEndpoint from "../services/endpoints/interviewerEndpoint";

export const signup = async (
  name: string,
  email: string,
  mobile: number,
  password: string
) => {
  try {
    const response = await Api.post(interviewerEndpoint.interviewerSignUp, {
      name,
      email,
      mobile,
      password,
    });
    const token = response.data.data;
    localStorage.setItem("interviewerOtp", token);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async (otp: string) => {
  try {
    let token = localStorage.getItem("interviewerOtp");
    const response = await Api.post(
      interviewerEndpoint.verifyOtp,
      { otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      localStorage.removeItem("interviewerOtp");
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const resendOtp = async () => {
  try {
    const token = localStorage.getItem("interviewerOtp");
    const response = await Api.post(interviewerEndpoint.resendOtp, "", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newToken = response.data.token;
    localStorage.setItem("interviewerOtp", newToken);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyLogin = async (email: string, password: string) => {
  try {
    const response = await Api.post(interviewerEndpoint.verifyLogin, {
      email,
      password,
    });
    console.log("response: ", response);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

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
        if (
          key === "profilePicture" ||
          key === "salarySlip" ||
          key === "resume"
        ) {
          // formData.append(key, interviewerDetails[key][0]);
          formData.append(key, (value as File[])[0]);
        } else {
          // formData.append(key, interviewerDetails[key] );
          formData.append(key, value as string);
        }
      }
    }

    const response = await Api.post(
      interviewerEndpoint.verifyDetails,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error in verifying details: ", error);
  }
};

export const logout = async () => {
  const response = await Api.post(interviewerEndpoint.logout);
  return response.data;
};

export const homeDetails = async () => {
  const response = await Api.get(interviewerEndpoint.homeDetails);
  return response.data;
};

interface Technologies {
  value: string;
  label: string;
}

interface SlotData {
  description: string;
  timeFrom: Date;
  timeTo: Date;
  title: string;
  status: "open" | "booked";
  price: number;
  date: Date | null;
  technologies: Technologies[]
  
}

export const addSlot = async (slotData: SlotData) => {
  try {
    const response = await Api.post(interviewerEndpoint.addSlot, { slotData });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getSlotsList = async () => {
  try {
    const response = await Api.get(interviewerEndpoint.getSlots);
    return response.data;
  } catch (error: any) {
    return error.response.data
  }
};

export const getDomains = async () => {
  try {
    const response = await Api.get(interviewerEndpoint.getDomains);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const forgorPassword = async (email: string) => {
  try {
    const response = await Api.post(interviewerEndpoint.ForgotPassword, {email})
    localStorage.setItem("intResetPassword", response.data.data);
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}


export const resetPassword = async (otp: string, password: string) => {
  try {
      const token = localStorage.getItem("intResetPassword")
      const response = await Api.post(interviewerEndpoint.resetPassword, {otp, password}, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      if(response.data.success){
          localStorage.removeItem("intResetPassword")
      }
      return response.data
  } catch (error: any) {
      console.log("inseide catch in api: ", error.response.data)
      return error.response.data
  }
}

export const getSchedulesInterviews = async() => {
  try {
      const response = await Api.get(interviewerEndpoint.getSchedulesInterviews)
      return response.data
  } catch (error: any) {
    return error.response.data
  }
}



export const getInterviewerDetails = async() => {
  try {
    const response = await Api.get(interviewerEndpoint.getInterviewerDetails)
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data

  }
}


export const getFeedbackDetails = async (interviewId: string) => {
  try {
    const {data} = await Api.get(interviewerEndpoint.getFeedbackDetails, {params: {interviewId}})
    return data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}

interface IFeedbacK{
  interviewId: string
  interviewerId: string
  candidateId: string
  technicalSkills: string,
  communicationSkills: string
  problemSolvingSkills: string
  strength: string
  areaOfImprovement: string
  additionalCommen: string

}


export const saveFeedback = async (fullDetails: IFeedbacK) => {
  try {
    const {data} = await Api.post(interviewerEndpoint.saveFeedbackDetails, {fullDetails})
    return data
  } catch (error: any) {
    console.log(error)
    return error.response.data
  }
}         


export const getPaymentDashboardDetails = async() => {
  try {
    const {data} = await Api.get(interviewerEndpoint.getPaymentDashboardDetails)
    return data
  } catch (error) {
    console.log(error)
  }
}
  

export const verifyInterviewerVideoConference = async (roomId: string, userId: string) => {
  try {
      const {data} = await Api.post(interviewerEndpoint.verifyInterviewerVideoConference, {roomId, userId})
      return data
  } catch (error: any) {
      console.log(error)
      return error.response.data
  }
}  