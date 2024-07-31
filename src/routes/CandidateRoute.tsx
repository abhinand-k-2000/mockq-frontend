import { Navigate, Route, Routes } from "react-router-dom"
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
import CandidateFeedbackView from "../pages/candidate/CandidateFeedbackView"
import PremiumProtectedRoute from "../components/candidate/PremiumProtectedRoute"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { ReactNode } from "react"
import Analytics from "../pages/candidate/Analytics"
import Profile from "../pages/candidate/Profile"
import Candidate404 from "../pages/candidate/Candidate404"

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children }) => {
  const {candidateInfo} = useSelector((state: RootState) => state.auth);
  return candidateInfo ? <Navigate to="/candidate/home" /> : children;
};



const CandidateRoute = () => {


  return (  
    
    <Routes>
        <Route path="sign-up" element={<ProtectedRoute><CandidateSignUp/></ProtectedRoute>} />
        <Route path="login" element={<ProtectedRoute><CandidateLogin/></ProtectedRoute>} />
        <Route path="otp" element={<ProtectedRoute><CandidateOtp/></ProtectedRoute>} />
        <Route path="forgot-password" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />

        <Route path="" element={<CandidateLoggedIn/>}>
        <Route path="home" element={ <CandidateHome/>} />
        <Route path="interviewer-slot-details/:interviewerId" element={<InterviewerAndSlotDetails />} />
        <Route path="account" element={<Account />} />
        <Route path="outsourced-interviews" element={<OutsourcedInterviews/>} />
        <Route path="payment-success" element={<PaymentSuccess />} />
        <Route path="payment-failed" element={<PaymentFailed />} />
        <Route path="feedback/:interviewId" element={<CandidateFeedbackView />} />
        <Route path="community-chat" element={<PremiumProtectedRoute />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Candidate404 />} />
    </Routes>
  )
}

export default CandidateRoute  