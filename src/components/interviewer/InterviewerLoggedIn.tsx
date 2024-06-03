import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

interface RootState {
    auth: {
        interviewerInfo: string
    }
}

const InterviewerLoggedIn = () => {

    const {interviewerInfo} = useSelector((state: RootState) => state.auth)

  return (
    interviewerInfo ? <Outlet/> : <Navigate to='/login' />
  )
}

export default InterviewerLoggedIn