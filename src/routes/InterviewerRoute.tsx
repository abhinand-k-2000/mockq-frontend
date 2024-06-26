import { Routes, Route } from 'react-router-dom'
import InterviewerSignUp from '../pages/interviewer/InterviewerSignUp'
import InterviewerLogin from '../pages/interviewer/InterviewerLogin'
import InterviewerOtp from '../pages/interviewer/InterviewerOtp'
import InterviewerHome from '../pages/interviewer/InterviewerHome'
import InterviewerDetails from '../pages/interviewer/InterviewerDetails'
import InterviewerLoggedIn from '../components/interviewer/InterviewerLoggedIn'
// import InterviewerSidebar from '../components/interviewer/InterviewerSidebar'
import InterviewerLayout from '../components/interviewer/InterviewerLayout'
import AddSlot from '../pages/interviewer/AddSlot'
import SlotsList from '../pages/interviewer/SlotsList'
import ApprovalPending from '../pages/interviewer/ApprovalPending'
import ForgotPassword from '../pages/interviewer/ForgotPassword'


const InterviewerRoute = () => {
  return (
    
    <Routes>
        <Route path='sign-up' element={<InterviewerSignUp />} />
        <Route path='login' element={<InterviewerLogin />} />
        <Route path='otp' element={<InterviewerOtp/> } />
        <Route path='forgot-password' element={<ForgotPassword />} />
 

        <Route path='' element={<InterviewerLoggedIn/>}>

        {/* <Route
          path=""
          element={
            <ProtectedRoute>
              <InterviewerLoggedIn />
            </ProtectedRoute>
          }
        > */}

        {/* <Route path='home' element={<InterviewerHome/>} /> */}

        <Route path='home' element={<InterviewerLayout><InterviewerHome/></InterviewerLayout>} />
        <Route path='add-slot' element={<InterviewerLayout><AddSlot/></InterviewerLayout>} />

        {/* <Route path='home' element={<InterviewerSidebar/>} /> */}

        <Route path='slots-list' element={<InterviewerLayout><SlotsList/></InterviewerLayout>} />

        <Route path='details' element={<InterviewerDetails/>} />



        {/* </Route> */}

        <Route path='approval-pending' element={<InterviewerLayout><ApprovalPending/></InterviewerLayout>} />


        </Route>

    </Routes>  
  )
}

export default InterviewerRoute