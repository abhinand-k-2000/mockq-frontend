import { Route, Routes } from "react-router-dom"
import CandidateLogin from "../pages/candidate/CandidateLogin"
import CandidateSignUp from "../pages/candidate/CandidateSignUp"
import CandidateOtp from "../pages/candidate/CandidateOtp"
import CandidateHome from "../pages/candidate/CandidateHome"
import CandidateLoggedIn from "../components/candidate/CandidateLoggedIn"
import InterviewerAndSlotDetails from "../pages/candidate/InterviewerAndSlotDetails"
import Account from "../pages/candidate/Account"

const CandidateRoute = () => {
  return (  
    <Routes>
        <Route path="sign-up" element={<CandidateSignUp/>} />
        <Route path="login" element={<CandidateLogin/>} />
        <Route path="otp" element={<CandidateOtp/>} />


        <Route path="" element={<CandidateLoggedIn/>}>
        <Route path="home" element={<CandidateHome/>} />
        <Route path="interviewer-slot-details/:interviewerId" element={<InterviewerAndSlotDetails />} />
        <Route path="account" element={<Account />} />

        </Route>
    </Routes>
  )
}

export default CandidateRoute  