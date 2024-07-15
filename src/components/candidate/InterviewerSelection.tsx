import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaUser, FaExclamationCircle } from "react-icons/fa";
import { getInterviewersByTech } from "../../api/candidateApi";

interface Interviewer {
  _id: string;
  name: string;
  introduction: string;
  profilePicture: string;
}

interface InterviewerSelectionProps {
  selectedTech: string;
  onSelectTech: (tech: string) => void;
}

const InterviewerSelection: React.FC<InterviewerSelectionProps> = ({
  selectedTech,
  onSelectTech,
  
}) => {
  const [interviewers, setInterviewers] = useState<Interviewer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviewersByTech = async () => {
      try {
        const response = await getInterviewersByTech(selectedTech);
        setInterviewers(response.data.interviewersList);
      } catch (error) {
        console.error("Error fetching interviewers:", error);
      }
    };

    fetchInterviewersByTech();
  }, [selectedTech]);

  const filteredInterviewers = interviewers.filter(interviewer =>
    interviewer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const InterviewerCard: React.FC<{ interviewer: Interviewer }> = ({ interviewer }) => (
    <div
      onClick={() => navigate(`/candidate/interviewer-slot-details/${interviewer._id}`, { state: { selectedTech } })}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer overflow-hidden border border-indigo-100 group"
    >
      <div className="flex items-center p-2 space-x-6">
        <div className="flex-shrink-0">
          {interviewer.profilePicture ? (
            <img
              src={interviewer.profilePicture}
              alt={interviewer.name}
              className="w-20 h-20 rounded-full  border-2 border-indigo-500 group-hover:border-indigo-600 transition duration-300 shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center border-2 border-indigo-500 group-hover:border-indigo-600 transition duration-300 shadow-md">
              <FaUser className="text-3xl text-white" />
            </div>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-indigo-900 group-hover:text-indigo-700 transition duration-300">
            {interviewer.name}
          </h3>
          <p className="text-sm text-indigo-700 mt-1 line-clamp-2 group-hover:text-indigo-600 transition duration-300">
            {interviewer.introduction}
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center ">
            <FaArrowLeft className="transform rotate-180 " />
          </div>
        </div>
      </div>
      {/* <div className="h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div> */}
    </div>
  );

  const NoInterviewers: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-md">
      <FaExclamationCircle className="text-6xl text-[#142057] mb-4" />
      <p className="text-xl font-medium text-[#142057]">No interviewers registered</p>
      <p className="text-sm text-[#2A3F7E] mt-2">Check back later for available interviewers</p>
    </div>
  );

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#EEF5FF] to-[#D9E9FF] px-4 sm:px-6 lg:px-8">
      <div className="w-1/2 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => onSelectTech("")}
              className="mr-4 p-2 rounded-full text-indigo-600 hover:bg-[#D9E9FF] transition duration-300"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <h1 className="text-4xl sm:text-5xl font-bold text-indigo-900">
              Interviewers for {selectedTech}
            </h1>
          </div>
          
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search interviewers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
  
          <div className="space-y-6">
            {filteredInterviewers.length ? (
              filteredInterviewers.map((interviewer) => (
                <InterviewerCard key={interviewer._id} interviewer={interviewer} />
              ))
            ) : (
              <NoInterviewers />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewerSelection;