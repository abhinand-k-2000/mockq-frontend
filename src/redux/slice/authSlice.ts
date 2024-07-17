import {createSlice } from  '@reduxjs/toolkit'

const initialState = {
    candidateInfo: localStorage.getItem("candidateInfo") ? JSON.parse(localStorage.getItem('candidateInfo') as string) : null,
    interviewerInfo: localStorage.getItem("interviewerInfo") ? JSON.parse(localStorage.getItem("interviewerInfo") as string) : null,
    adminInfo: localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo") as string) : null
} 



const authSlice = createSlice({ 
    name: 'auth',
    initialState,
    reducers: {
        setCandidateCredentials: (state, action) => {
            state.candidateInfo = action.payload
            localStorage.setItem("candidateInfo", JSON.stringify(action.payload))
        },
        candidateLogout: (state) => {
            state.candidateInfo = null
            localStorage.removeItem("candidateInfo")
        },
        setInterviewerCredentials: (state, action) => {
            state.interviewerInfo = action.payload
            localStorage.setItem("interviewerInfo", JSON.stringify(action.payload))
        },
        interviewerLogout: (state) => {
            state.interviewerInfo = null
            localStorage.removeItem("interviewerInfo")
        },
        setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload
            localStorage.setItem("adminInfo", JSON.stringify(action.payload))
        },
        adminLogout: (state) => { 
            state.adminInfo = null
            localStorage.removeItem("adminInfo")
        }


    }
})


export const {setCandidateCredentials, candidateLogout, setInterviewerCredentials, interviewerLogout, setAdminCredentials, adminLogout
} = authSlice.actions;
export default authSlice.reducer