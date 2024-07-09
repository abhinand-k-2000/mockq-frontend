import { useEffect, useState } from "react";
import { MdEdit, MdPhone, MdEmail } from "react-icons/md";
import { homeDetails } from "../../api/interviewerApi";

interface Interviewer {
  name: string;
  currentDesignation: string;
  introduction: string;
  organisation: string;
  yearsOfExperience: number;
}

const InterviewerHome = () => {
  const [interviewerDetails, setInterviewerDetails] = useState<Interviewer>();

  useEffect(() => {
    const fetchHomeDetails = async () => {
      const response = await homeDetails();
      setInterviewerDetails(response.data.interviewer);
    };
    fetchHomeDetails();
  }, []);

  return (
    
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-3xl font-bold p-6 bg-[#142057] text-white">
          My Profile
        </h2>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">{interviewerDetails?.name}</h3>
              <p className="text-lg text-gray-600">{interviewerDetails?.currentDesignation}</p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">About</h4>
              <p className="text-gray-600">{interviewerDetails?.introduction}</p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Organisation</h4>
              <p className="text-gray-600">{interviewerDetails?.organisation}</p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Years of Experience</h4>
              <p className="text-gray-600">{interviewerDetails?.yearsOfExperience} Years</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <button className="bg-[#142057] text-white p-2 rounded-full hover:bg-[#19328F] transition-colors">
              <MdEdit size={24} />
            </button>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                <MdPhone className="mr-2" /> Mobile
              </h4>
              <p className="text-gray-600">8089543705</p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                <MdEmail className="mr-2" /> Email
              </h4>
              <p className="text-gray-600">abhi@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewerHome;