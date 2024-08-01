import toast from "react-hot-toast";
import { verifyDetails } from "../../api/interviewerApi";
import InterviewerNavbar from "../../components/interviewer/InterviewerNavbar";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  name: string;
  email: string;
  mobile: number
  yearsOfExperience: number;
  currentDesignation: string;
  organisation: string;
  collegeUniversity: string;
  introduction: string;
  profilePicture: File[];
  salarySlip: File[];
  resume: File[];
}

const InterviewerDetails = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await verifyDetails(data)
    if(response){
      toast.success("Profile information added")
      navigate('/interviewer/home')
    }else {
      toast.error("Something went wrong")
    }
  };

  return (
    <>
      <InterviewerNavbar />

      <div className="min-h-screen flex items-center justify-center bg-[#D9E9FF] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8 bg-white shadow-2xl rounded-3xl p-10">
          <div className="text-center">
            <h2 className="mt-6 text-4xl font-extrabold text-[#142057]">
              Configure Your Profile
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please fill out the information below for profile verification
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="years-of-experience" className="sr-only">Years Of Experience</label>
                  <input
                    id="years-of-experience"
                    type="tel"
                    {...register("yearsOfExperience", { required: true, pattern: /^\d+$/ })}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Years of Experience"
                  />
                  {errors.yearsOfExperience && <p className="mt-2 text-sm text-red-600">This field is required and should be a number</p>}
                </div>
                <div>
                  <label htmlFor="current-designation" className="sr-only">Current Designation</label>
                  <input
                    id="current-designation"
                    type="text"
                    {...register("currentDesignation", { required: true })}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Current Designation"
                  />
                  {errors.currentDesignation && <p className="mt-2 text-sm text-red-600">This field is required</p>}
                </div>
                <div>
                  <label htmlFor="organisation" className="sr-only">Organisation</label>
                  <input
                    id="organisation"
                    type="text"
                    {...register("organisation", { required: true })}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Organisation"
                  />
                  {errors.organisation && <p className="mt-2 text-sm text-red-600">This field is required</p>}
                </div>
                <div>
                  <label htmlFor="college-university" className="sr-only">College / University</label>
                  <input
                    id="college-university"
                    type="text"
                    {...register("collegeUniversity", { required: true })}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="College / University"
                  />
                  {errors.collegeUniversity && <p className="mt-2 text-sm text-red-600">This field is required</p>}
                </div>
              </div>
              <div >
                <label htmlFor="introduction" className="sr-only ">Introduction</label>
                <textarea
                  id="introduction"
                  {...register("introduction", { required: true })}
                  rows={3}
                  className="appearance-none mt-5 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Write a brief introduction"
                />
                {errors.introduction && <p className="mt-2 text-sm text-red-600">This field is required</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="profile-picture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <input
                  id="profile-picture"
                  type="file"
                  {...register("profilePicture", { required: true })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.profilePicture && <p className="mt-2 text-sm text-red-600">This field is required</p>}
              </div>
              <div>
                <label htmlFor="salary-slip" className="block text-sm font-medium text-gray-700">Salary Slip</label>
                <input
                  id="salary-slip"
                  type="file"
                  {...register("salarySlip", { required: true })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.salarySlip && <p className="mt-2 text-sm text-red-600">This field is required</p>}
              </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
                <input
                  id="resume"
                  type="file"
                  {...register("resume", { required: true })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.resume && <p className="mt-2 text-sm text-red-600">This field is required</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Save & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InterviewerDetails;