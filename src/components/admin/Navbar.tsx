import toast from "react-hot-toast"
import { logout } from "../../api/adminApi"
import { useDispatch } from "react-redux"
import { adminLogout } from "../../redux/slice/authSlice"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

const handleLogout = async () => {
  const response = await logout()
  if(response.success){
    toast.success("Log out successful")
    dispatch(adminLogout())
    navigate('/admin')
  }
}

  return (

    <nav className="bg-blue-800 p-4 ">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">MockQ</div>
          <div className="text-white font-medium">
            <button onClick={handleLogout} className="font-bold cursor-pointer">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar