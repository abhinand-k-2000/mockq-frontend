import { Route, Routes } from "react-router-dom"
import CandidateLogin from "../pages/candidate/CandidateLogin"
import CandidateSignUp from "../pages/candidate/CandidateSignUp"
import CandidateOtp from "../pages/candidate/CandidateOtp"
import CandidateHome from "../pages/candidate/CandidateHome"
import CandidateLoggedIn from "../components/candidate/CandidateLoggedIn"

const CandidateRoute = () => {
  return (  
    <Routes>
        <Route path="sign-up" element={<CandidateSignUp/>} />
        <Route path="login" element={<CandidateLogin/>} />
        <Route path="otp" element={<CandidateOtp/>} />


        <Route path="" element={<CandidateLoggedIn/>}>
        <Route path="home" element={<CandidateHome/>} />

        </Route>
    </Routes>
  )
}

export default CandidateRoute  