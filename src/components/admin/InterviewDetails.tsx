import React from 'react';
import { IInterview } from "../../pages/admin/Interviews";

interface IProps {
  interview: IInterview;
  onClose: () => void;
}

const InterviewDetails: React.FC<IProps> = ({ interview, onClose }) => {
  return (
    <div className="bg-[#f4f5f8] rounded-xl shadow-2xl p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-[#19328F]">Interview Details</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition duration-300">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-500">
          <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Interview Info
          </h3>
          <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">ID:</span> {interview._id}</p>
          <p className="text-sm text-gray-600 mt-2"><span className="font-medium text-gray-800">Date:</span> {new Date(interview.date).toLocaleDateString("en-IN")}</p>
          <p className="text-sm text-gray-600 mt-2"><span className="font-medium text-gray-800">Time:</span> {new Date(interview.fromTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} - {new Date(interview.toTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
          <p className="text-sm text-gray-600 mt-2"><span className="font-medium text-gray-800">Domain:</span> {interview.title}</p>
          <p className="text-sm text-gray-600 mt-2"><span className="font-medium text-gray-800">Description:</span> {interview.description}</p>
          <p className="text-sm text-gray-600 mt-2"><span className="font-medium text-gray-800">Price:</span> ₹{interview.price}</p>
          <p className="mt-4">
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
              interview.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' : 
              interview.status === 'Completed' ? 'bg-green-100 text-green-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {interview.status}
            </span>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Candidate
          </h3>
          <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">Name:</span> {interview.candidate.name}</p>
          <p className="text-sm text-gray-600 mt-2"><span className="font-medium text-gray-800">Email:</span> {interview.candidate.email}</p>
          <p className="text-sm text-gray-600 mt-2"><span className="font-medium text-gray-800">Mobile:</span> {interview.candidate.mobile}</p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-medium text-gray-800">Premium:</span> 
            <span className={`ml-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
              interview.candidate.isPremium ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              {interview.candidate.isPremium ? "Yes" : "No"}
            </span>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Interviewer
          </h3>
          <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">Name:</span> {interview.interviewer.name}</p>
          <p className="text-sm text-gray-600 mt-2"><span className="font-medium text-gray-800">Email:</span> {interview.interviewer.email}</p>
          <p className="text-sm text-gray-600 mt-2"><span className="font-medium text-gray-800">Mobile:</span> {interview.interviewer.mobile}</p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-medium text-gray-800">Premium:</span> 
            <span className={`ml-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
              interview.interviewer.isPremium ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              {interview.interviewer.isPremium ? "Yes" : "No"}
            </span>
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        {/* <button onClick={onClose} className="bg-[#19328F] text-white font-bold py-3 px-8 rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition duration-300">
          Close Details
        </button> */}
      </div>
    </div>
  );
}

export default InterviewDetails;