import { Route, Routes } from "react-router-dom"
import CandidateLogin from "../pages/candidate/CandidateLogin"
import CandidateSignUp from "../pages/candidate/CandidateSignUp"
import CandidateOtp from "../pages/candidate/CandidateOtp"
import CandidateHome from "../pages/candidate/CandidateHome"
import CandidateLoggedIn from "../components/candidate/CandidateLoggedIn"
import InterviewerAndSlotDetails from "../pages/candidate/InterviewerAndSlotDetails"
import Account from "../pages/candidate/Account"
import PaymentSuccess from "../pages/candidate/PaymentSuccess"
import OutsourcedInterviews from "../pages/candidate/OutsourcedInterviews"
import PaymentFailed from "../pages/candidate/PaymentFailed"
import ForgotPassword from "../pages/candidate/ForgotPassword"

const CandidateRoute = () => {
  return (  
    <Routes>
        <Route path="sign-up" element={<CandidateSignUp/>} />
        <Route path="login" element={<CandidateLogin/>} />
        <Route path="otp" element={<CandidateOtp/>} />
        <Route path="forgot-password" element={<ForgotPassword />} />


        <Route path="" element={<CandidateLoggedIn/>}>
        <Route path="home" element={<CandidateHome/>} />
        <Route path="interviewer-slot-details/:interviewerId" element={<InterviewerAndSlotDetails />} />
        <Route path="account" element={<Account />} />

        <Route path="outsourced-interviews" element={<OutsourcedInterviews/>} />

        <Route path="payment-success" element={<PaymentSuccess />} />
        <Route path="payment-failed" element={<PaymentFailed />} />

        </Route>
    </Routes>
  )
}

export default CandidateRoute  