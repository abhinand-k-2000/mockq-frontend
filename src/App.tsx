
import Welcome from "./pages/common/Welcome"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminRoute from "./routes/AdminRoute"
import SignUp from "./pages/common/SignUp"
import Login from "./pages/common/Login"
import CandidateRoute from "./routes/CandidateRoute"
import InterviewerRoute from "./routes/InterviewerRoute"


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />

          <Route path="/admin/*" element={<AdminRoute/>} />
          <Route path="/candidate/*" element={<CandidateRoute/>} />
          <Route path='/interviewer/*' element={<InterviewerRoute/>} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
