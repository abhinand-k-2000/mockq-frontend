import { useEffect, useState } from "react";
import { MdEdit, MdPhone, MdEmail } from "react-icons/md";
import { homeDetails } from "../../api/interviewerApi";
import { useNavigate } from "react-router-dom";

interface Interviewer {
  name: string;
  mobile: number;
  email: string;
  currentDesignation: string;
  introduction: string;
  organisation: string;
  yearsOfExperience: number;
  hasCompletedDetails: boolean;
}

const InterviewerHome = () => {
  const [interviewerDetails, setInterviewerDetails] = useState<Interviewer | null>(null);
  const [hasCompletedDetails, setHasCompletedDetails] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchHomeDetails = async () => {
      const response = await homeDetails();
      setInterviewerDetails(response.data.interviewer);
      setHasCompletedDetails(response.data.interviewer.hasCompletedDetails);
      console.log('data: ', response.data)

      if (!response.data.interviewer.hasCompletedDetails) {
        navigate('/interviewer/details');
      }
    };
    fetchHomeDetails();
  }, [navigate]);

  if (!interviewerDetails) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  if (!hasCompletedDetails) {
    return null; // Optionally return null to avoid rendering anything before redirection
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-3xl font-bold p-6 bg-[#142057] text-white">
          My Profile
        </h2>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">{interviewerDetails.name}</h3>
              <p className="text-lg text-gray-600">{interviewerDetails.currentDesignation}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">About</h4>
              <p className="text-gray-600">{interviewerDetails.introduction}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Organisation</h4>
              <p className="text-gray-600">{interviewerDetails.organisation}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Years of Experience</h4>
              <p className="text-gray-600">{interviewerDetails.yearsOfExperience} Years</p>
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
              <p className="text-gray-600">{interviewerDetails.mobile}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                <MdEmail className="mr-2" /> Email
              </h4>
              <p className="text-gray-600">{interviewerDetails.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewerHome;
