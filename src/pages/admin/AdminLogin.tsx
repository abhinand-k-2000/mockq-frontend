import toast from "react-hot-toast";
import { verifyLogin } from "../../api/adminApi";
import adminIllustrator from "/adminLogin.png";
import {useForm, SubmitHandler} from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminCredentials } from "../../redux/slice/authSlice";

interface IFormInput {
  email: string,
  password: string
}

const AdminLogin = () => {

  const {register, handleSubmit, formState:{errors}} = useForm<IFormInput>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<IFormInput> =async (data) => {
    const {email, password} = data
    const response = await verifyLogin(email, password)
    if(response?.data.success){
      console.log(response.data)
      dispatch(setAdminCredentials(response.data.token))
      toast.success("Successfully logged in")
      navigate('/admin/dashboard')
    } else {
      toast.error("Invalid credentials")
    }
    
  }

    return (
      <div className="h-screen bg-[#D9E9FF] grid grid-cols-12">
        <div className="col-span-6 hidden md:flex justify-center items-center">
          <img src={adminIllustrator} alt="illustrator" className="w-1/2" />
        </div>
        
        <div className="col-span-6 ">
          <div className="min-h-screen py-6 flex flex-col sm:py-12 justify-center">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#599EFF] to-[#2F76FF] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
              <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                  <div>
                    <h1 className="text-2xl font-semibold">Admin Login</h1>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                          placeholder="Email address"
                          {...register("email", {required: true})}
                          
                        />
                        {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
                        <label
                          htmlFor="email"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Email Address
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          id="password"
                          type="password"
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                          placeholder="Password"
                          {...register("password", {required: true})}
                        />
                        {errors.password && (
                  <p className="text-red-500 text-sm mt-1">Password is required</p>
                )}
                        <label
                          htmlFor="password"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <button className="bg-[#19328F] hover:bg-[#1442E1] text-white rounded-md px-2 py-1">
                          Submit
                        </button>
                      </div>
                      
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default AdminLogin;
