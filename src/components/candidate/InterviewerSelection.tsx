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
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer overflow-hidden border-1 border-[#142057] group"
    >
      <div className="flex items-center p-4 space-x-4">
        {interviewer.profilePicture ? (
          <img
            src={interviewer.profilePicture}
            alt={interviewer.name}
            className="w-16 h-16 rounded-full object-cover border-1 border-[#142057] group-hover:border-[#EEF5FF] transition duration-300"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[#EEF5FF] flex items-center justify-center border-2 border-[#142057] group-hover:bg-[#142057] group-hover:text-[#EEF5FF] transition duration-300">
            <FaUser className="text-2xl" />
          </div>
        )}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-[#142057]  transition duration-300">{interviewer.name}</h3>
          <p className="text-sm text-[#2A3F7E]  line-clamp-2 transition duration-300">{interviewer.introduction}</p>
        </div>
        <FaArrowLeft className="transform rotate-180 text-[#142057]  transition duration-300" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#142057] to-[#1D2B6B] opacity-0 group-hover:opacity-100 transition duration-300 -z-10"></div>
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
              className="mr-4 p-2 rounded-full bg-[#D9E9FF] text-indigo-600 hover:bg-[#BCD8FF] transition duration-300"
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