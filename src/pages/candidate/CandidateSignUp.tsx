import Navbar from "../../components/welcome_page/Navbar";
import signUpImage from "/candidateSignUp.png";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "../../api/candidateApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

interface IFormInput {
  name: string;
  email: string;
  mobile: number;
  password: string;
}

const CandidateSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const { name, email, mobile, password } = data;
      const response = await signup(name, email, mobile, password);
      if (response?.data.success) {
        navigate("/candidate/otp");
      } else {
        toast.error("Email already in use. Please log in or choose another.");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="h-[100vh] bg-[#D9E9FF] items-center flex justify-center pt-20 px-5 lg:px-0">
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1  text-center hidden md:flex">
            <div className="m-12 xl:m-16 w-full bg-contain flex justify-center">
              <img className="w-3/4" src={signUpImage} alt="" />
            </div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold text-[#142057]">
                  Candidate Sign up
                </h1>
                <p className="text-[12px] text-gray-500">
                  Hey enter your details to create your account
                </p>
              </div>

              <div className="w-full flex-1 mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mx-auto max-w-xs flex flex-col gap-3">
                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your name"
                      {...register("name", {
                        required: true,
                        pattern: /^(?=.*[a-zA-Z])[a-zA-Z ]{2,30}$/,
                      })}
                    />
                    {errors.name && errors.name.type === "required" && (
                      <p className="text-red-500 text-sm m-0 p-0">
                        Name is required
                      </p>
                    )}
                    {errors.name && errors.name.type === "pattern" && (
                      <p className="text-red-500 text-sm m-0 p-0">
                        Invalid Name
                      </p>
                    )}

                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: true,
                        pattern: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                      })}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <p className="text-red-500 text-sm">Email is required</p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <p className="text-red-500 text-sm">
                        Invalid email address
                      </p>
                    )}

                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="tel"
                      placeholder="Enter your phone"
                      {...register("mobile", {
                        required: true,
                        pattern: /^[0]?[789]\d{9}$/,
                      })}
                    />
                    {errors.mobile && errors.mobile.type === "required" && (
                      <p className="text-red-500 text-sm">
                        Mobile number is required
                      </p>
                    )}
                    {errors.mobile && errors.mobile.type === "pattern" && (
                      <p className="text-red-500 text-sm">
                        Invalid mobile number
                      </p>
                    )}

                    <input
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        pattern:
                          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                      })}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <p className="text-red-500 text-sm">
                        Password is required
                      </p>
                    )}
                    {errors.password && errors.password.type === "pattern" && (
                      <p className="text-red-500 text-sm">
                        Password should be 6-16 characters long and contain at
                        least one number and one special character
                      </p>
                    )}

                    <button
                      disabled={loading}
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-[#142057] text-gray-100 w-full py-4 rounded-lg hover:bg-[#19328F] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      {loading ? (
                        <FaSpinner className="animate-spin mr-2" />
                      ) : (
                        "Sign Up"
                      )}
                    </button>

                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Already have an account?{" "}
                      <Link to="/candidate/login">
                        <span className="text-[#142057] font-semibold">
                          Sign in
                        </span>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateSignUp;
