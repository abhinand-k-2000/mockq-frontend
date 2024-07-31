import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import { editPassword, editProfile } from "../../api/interviewerApi";
import toast from "react-hot-toast";


interface Interviewer {
  name: string;
  mobile: number;
  email: string;
  currentDesignation: string;
  introduction: string;
  organisation: string;
  yearsOfExperience: number;

}

interface IPassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface EditInterviewerProps {
  setShowEdit: (show: boolean) => void;
  interviewerDetails: Interviewer;
  onProfileEdit: (updatedData:Interviewer) => void
}

const EditInterviewer: React.FC<EditInterviewerProps> = ({setShowEdit, interviewerDetails, onProfileEdit}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Interviewer>({defaultValues: interviewerDetails});

  const {register: registerPassword, handleSubmit: handleSubmitPassword, reset: resetPassword, formState: {errors:errorsPassword}, watch} = useForm<IPassword>()

  const handleEdit: SubmitHandler<Interviewer> =async (data) => {

    const response = await editProfile(data);
    if(response.success){
      toast.success("Profile Updated Successfully", {
        style: {
          border: "1px solid #2F76FF",
          padding: "16px",
          color: "#19328F",
          backgroundColor: "#D9E9FF",
        },
      });
      onProfileEdit(data)
    }else{
      toast.error("Something went wrong")
    }
  };

  const handlePassword: SubmitHandler<IPassword> = async (data) => {
    console.log('he')
    try {
      const response = await editPassword(data.oldPassword, data.newPassword);
      if(response.success) {
          toast.success("Password updated", {
              style: {
                  border: "1px solid #2F76FF",
                  padding: "16px",
                  color: "#19328F",
                  backgroundColor: "#D9E9FF",
              },
          });
          console.log('Password changed');
          resetPassword();
      } else {
        toast.error(response.message,{
            style: {
              border: '1px solid #FF4D4F',
              padding: '16px',
              color: '#FF4D4F',
              backgroundColor: '#FFF2F2',
            },}
          
        );
      }
  } catch (error) {
      toast.error("An unexpected error occurred", {
          style: {
              border: "1px solid #FF0000",
              padding: "16px",
              color: "#8F1919",
              backgroundColor: "#FFD9D9",
          },
      });
      console.error('Unexpected error: ', error);
  }
  }
  

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#142057] p-6 flex items-center">
          <button onClick={() => setShowEdit(false)} className="text-white mr-4">
            <MdArrowBack size={24} />
          </button>
          <h2 className="text-3xl font-bold text-white">Edit Profile</h2>
        </div>
        <form onSubmit={handleSubmit(handleEdit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[a-zA-Z ]{2,30}$/,
                    message: "Invalid name format",
                  },
                  minLength: {
                    value: 3,
                    message: "Must be at least 3 letters",
                  },
                  validate: {
                    notWhitespace: value => value.trim() !== "" || "Input cannot be empty spaces",
                  },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.name && (
                <p className="text-sm text-red-600 pt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                {...register("mobile", {
                  required: "Mobile is required",
                  pattern: {
                    value: /^[0]?[789]\d{9}$/,
                    message: "Enter a valid number",
                  },
                  
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.mobile && (
                <p className="text-sm text-red-600 pt-1">{errors.mobile.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                readOnly
                className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="currentDesignation" className="block text-sm font-medium text-gray-700">
                Current Designation
              </label>
              <input
                type="text"
                id="currentDesignation"
                {...register("currentDesignation", {
                  required: "This field is required",
                  validate: {
                    notWhitespace: value => value.trim() !== "" || "Input cannot be empty spaces",
                  },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.currentDesignation && (
                <p className="text-sm text-red-600 pt-1">{errors.currentDesignation.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="organisation" className="block text-sm font-medium text-gray-700">
                Organisation 
              </label>
              <input
                type="text"
                id="organisation"
                {...register("organisation", {
                  required: "Organisation is required",
                  validate: {
                    notWhitespace: value => value.trim() !== "" || "Input cannot be empty spaces",
                  },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.organisation && (
                <p className="text-sm text-red-600 pt-1">{errors.organisation.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                {...register("yearsOfExperience", {
                  required: "Years of experience is required",
                  min: {
                    value: 0,
                    message: "Experience cannot be negative",
                  },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.yearsOfExperience && (
                <p className="text-sm text-red-600 pt-1">{errors.yearsOfExperience.message}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="introduction" className="block text-sm font-medium text-gray-700">
              Introduction
            </label>
            <textarea
              id="introduction"
              {...register("introduction", {
                required: "Introduction is required",
                validate: {
                    notWhitespace: value => value.trim() !== "" || "Input cannot be empty spaces",
                  },
              })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
            {errors.introduction && (
              <p className="text-sm text-red-600 pt-1">{errors.introduction.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#142057] text-white rounded-md hover:bg-[#19328F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>





      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b bg-[#142057] border-gray-200">
          <h2 className="text-xl font-semibold text-white">Change Password</h2>
        </div>
        <form onSubmit={handleSubmitPassword(handlePassword)} className="p-6 space-y-4">
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              {...registerPassword("oldPassword", {required:  "Password is required"})}
              placeholder="Enter old password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {
                errorsPassword .oldPassword && <p className="text-sm text-red-600 pt-1">{errorsPassword .oldPassword.message}</p>
            }
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              {...registerPassword("newPassword", {required:  "Password is required",
                pattern:{
                    value:  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                    message: "Password should be 6-16 characters long and contain at least one number and one special character"
                }
                         
              })}
              placeholder="Enter new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {
                errorsPassword .newPassword && <p className="text-sm text-red-600 pt-1">{errorsPassword .newPassword.message}</p>
            }
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...registerPassword("confirmPassword", {required:  "Password is required",
                validate: (val: string) => {
                    if(watch('newPassword') != val){
                        return "Your passwords do not match"
                    }
                }
              })}
              placeholder="Confirm password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {
                errorsPassword .confirmPassword && <p className="text-sm text-red-600 pt-1">{errorsPassword .confirmPassword.message}</p>
            }
          </div>
          <div className="pt-4">
            <button className="w-full px-4 py-2 bg-[#142057] text-white rounded-md hover:bg-[#19328F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInterviewer;
