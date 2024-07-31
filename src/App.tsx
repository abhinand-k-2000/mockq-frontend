
import Welcome from "./pages/common/Welcome"
import { Routes, Route, Navigate } from "react-router-dom"
import AdminRoute from "./routes/AdminRoute"
import SignUp from "./pages/common/SignUp"
import Login from "./pages/common/Login"
import CandidateRoute from "./routes/CandidateRoute"
import InterviewerRoute from "./routes/InterviewerRoute"
import Room from "./pages/common/Room"
import { RootState } from "./redux/store"
import { useSelector } from "react-redux"
import { ReactNode } from "react"
import NotFound from "./pages/common/NotFound"

interface IProps {
  children: ReactNode;
}
const ProtectedRoute: React.FC<IProps> = ({ children }) => {
  const user = useSelector(
    (state: RootState) => state.auth.interviewerInfo || state.auth.candidateInfo
  );

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};


function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />

          <Route path="/room/:roomId" element={<ProtectedRoute>
            <Room />
          </ProtectedRoute>} />

          <Route path="/admin/*" element={<AdminRoute/>} />
          <Route path="/candidate/*" element={<CandidateRoute/>} />
          <Route path='/interviewer/*' element={<InterviewerRoute/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  )
}

export default App
