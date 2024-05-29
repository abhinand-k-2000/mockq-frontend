import React from 'react'
import {Routes, Route} from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'

const AdminRoute = () => {
  return (
    <Routes>
        <Route path='' element={<AdminLogin/>} />
    </Routes>
  )
}

export default AdminRoute