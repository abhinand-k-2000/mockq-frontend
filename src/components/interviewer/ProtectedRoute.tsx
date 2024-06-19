import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'


interface ProtectedRouteProps {
    children: ReactNode
}


const getApprovalStatus = ():boolean => {
    return true
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {

    const isApproved = getApprovalStatus()

    if(!isApproved){
        return <Navigate to='/interviewer/approval-pending'/>
    }

    return children

 
}

export default ProtectedRoute