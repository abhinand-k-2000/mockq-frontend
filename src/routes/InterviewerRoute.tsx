import { Routes, Route, Navigate } from 'react-router-dom'
import InterviewerSignUp from '../pages/interviewer/InterviewerSignUp'
import InterviewerLogin from '../pages/interviewer/InterviewerLogin'
import InterviewerOtp from '../pages/interviewer/InterviewerOtp'
import InterviewerHome from '../pages/interviewer/InterviewerHome'
import InterviewerDetails from '../pages/interviewer/InterviewerDetails'
import InterviewerLoggedIn from '../components/interviewer/InterviewerLoggedIn'
import InterviewerLayout from '../components/interviewer/InterviewerLayout'
import AddSlot from '../pages/interviewer/AddSlot'
import SlotsList from '../pages/interviewer/SlotsList'
import ApprovalPending from '../pages/interviewer/ApprovalPending'
import ForgotPassword from '../pages/interviewer/ForgotPassword'
import ScheduledInterviews from '../pages/interviewer/ScheduledInterviews'
import FeedbackForm from '../pages/interviewer/FeedbackForm'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { ReactNode } from 'react'
import PaymentsDashboard from '../pages/interviewer/PaymentsDashboard'



interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const {interviewerInfo} = useSelector((state: RootState) => state.auth)
  return interviewerInfo ? <Navigate to='/interviewer/home' /> : children
}


const InterviewerRoute = () => {
  return (
    
    <Routes>
        <Route path='sign-up' element={<ProtectedRoute><InterviewerSignUp /> </ProtectedRoute>} />
        <Route path='login' element={<ProtectedRoute><InterviewerLogin /></ProtectedRoute>} />
        <Route path='otp' element={<ProtectedRoute><InterviewerOtp/> </ProtectedRoute>} />
        <Route path='forgot-password' element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
 

        <Route path='' element={<InterviewerLoggedIn/>}>


        <Route path='home' element={<InterviewerLayout><InterviewerHome/></InterviewerLayout>} />
        <Route path='add-slot' element={<InterviewerLayout><AddSlot/></InterviewerLayout>} />


        <Route path='slots-list' element={<InterviewerLayout><SlotsList/></InterviewerLayout>} />

        <Route path='scheduled-interviews' element={<InterviewerLayout><ScheduledInterviews/></InterviewerLayout>} />

        <Route path='details' element={<InterviewerDetails/>} />


        <Route path='feedback-form/:interviewId' element={<InterviewerLayout><FeedbackForm /></InterviewerLayout>} />


        <Route path='approval-pending' element={<InterviewerLayout><ApprovalPending/></InterviewerLayout>} />

        <Route path='payments' element={<InterviewerLayout><PaymentsDashboard /></InterviewerLayout>} />



        </Route>

    </Routes>  
  )
}

export default InterviewerRoute