import React from 'react'

const ApprovalPending = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#EEF5FF]">
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Approval Pending</h1>
      <p>Your account is not yet approved. Please wait for the admin to approve your account.</p>
    </div>
  </div>
  )
}

export default ApprovalPending