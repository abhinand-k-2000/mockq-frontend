import toast from "react-hot-toast";
import { verifyLogin } from "../../api/adminApi";
import adminIllustrator from "/adminLogin.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminCredentials } from "../../redux/slice/authSlice";

interface IFormInput {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;
    const response = await verifyLogin(email, password);
    if (response?.data.success) {
      console.log(response.data);
      dispatch(setAdminCredentials(response.data.token));
      toast.success("Successfully logged in");
      navigate('/admin/dashboard');
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D9E9FF] to-[#F0F7FF] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transform  transition-all duration-300">
          <div className="px-8 py-12">
            <div className="flex justify-center mb-8">
              <img src={adminIllustrator} alt="Admin" className="h-40 w-auto drop-shadow-lg" />
            </div>
            <h2 className="text-center text-4xl font-extrabold text-[#19328F] mb-10">
              Admin Login
            </h2>
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#B0D4FF] focus:border-[#2F76FF] focus:outline-none transition-colors duration-300 bg-white bg-opacity-50"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="absolute text-red-500 text-xs mt-1">Email is required</p>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    {...register("password", { required: true })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#B0D4FF] focus:border-[#2F76FF] focus:outline-none transition-colors duration-300 bg-white bg-opacity-50"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="absolute text-red-500 text-xs mt-1">Password is required</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#19328F] hover:bg-[#2F76FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#599EFF] transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;