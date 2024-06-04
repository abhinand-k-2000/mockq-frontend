import toast from "react-hot-toast";
import { verifyDetails } from "../../api/interviewerApi";
import InterviewerNavbar from "../../components/interviewer/InterviewerNavbar";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  yearsOfExperience: string;
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
    console.log("response in component: ", response)
    if(response){
      toast.success("Profile verification successfull!")
      navigate('/interviewer/home')
    }else {
      toast.error("Something went wrong")
    }
    console.log(data);
  };

  return (
    <>
      <InterviewerNavbar />

      <div className="min-h-screen flex items-center justify-center bg-[#D9E9FF]  py-32">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
            <h1 className="text-2xl font-semibold mb-6">
              Great, Let's configure your profile
            </h1>
            <p className="mb-6">
              You are recommended to fill out this information which will be
              used for your profile verification
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">
                  Years Of Experience
                </label>
                <input
                  type="tel"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="How many years of experience do you have working in the industry?"
                  {...register("yearsOfExperience", {
                    required: true,
                    pattern: /^\d+$/,
                  })}
                />
                {errors.yearsOfExperience && (
                  <span className="text-red-500">
                    This field is required and should be a number
                  </span>
                )}
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-700">
                    Current Designation
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Current Designation"
                    {...register("currentDesignation", { required: true })}
                  />
                  {errors.currentDesignation && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700">Organisation</label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Organisation"
                    {...register("organisation", { required: true })}
                  />
                  {errors.organisation && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-700">
                  College / University
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Eg. University of Mumbai"
                  {...register("collegeUniversity", { required: true })}
                />
                {errors.collegeUniversity && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Introduction</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Write a one line introduction with"
                  {...register("introduction", { required: true })}
                />
                {errors.introduction && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-10 ">
              <div className="space-y-1 ">
                <label className="block text-gray-700">Upload Your Image</label>
                <input
                  type="file"
                  {...register("profilePicture", { required: true })}
                  className=""
                />
                {errors.profilePicture && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-gray-700">
                  Upload Your Salary Slip
                </label>
                <input
                  type="file"
                  {...register("salarySlip", { required: true })}
                  className=""
                />
                {errors.salarySlip && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-gray-700">
                  Upload Your Resume
                </label>
                <input
                  type="file"
                  {...register("resume", { required: true })}
                  className=""
                />
                {errors.resume && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InterviewerDetails;



