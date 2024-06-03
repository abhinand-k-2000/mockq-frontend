import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"



interface RootState {
    auth: {
        candidateInfo: string
    }
}
const CandidateLoggedIn = () => {

    const {candidateInfo} = useSelector((state: RootState) => state.auth)
  return (
    candidateInfo ? <Outlet/> : <Navigate to='/login' />
  )
}

export default CandidateLoggedIn