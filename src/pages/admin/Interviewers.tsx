


import React, { useEffect, useState } from "react";
import { getInterviewers } from "../../api/adminApi";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiMail, FiPhone, FiCheckCircle, FiXCircle, FiEye } from "react-icons/fi";

interface InterviewerData {
  collegeUniversity: string;
  currentDesignation: string;
  email: string;
  introduction: string;
  isApproved: boolean;
  isBlocked: boolean;
  mobile: string;
  name: string;
  organisation: string;
  // password: string;
  profilePicture: string;
  resume: string;
  salarySlip: string;
  yearsOfExperience: string;
  __v: number;
  _id: string;
}

const Interviewers: React.FC = () => {
  const [interviewers, setInterviewers] = useState<InterviewerData[]>([]);
  const [search, setSearch] = useState("");

  const handleSearch = (name: string) => {
    setSearch(name);
  };

  const filteredInterviewers = interviewers.filter((interviewer) =>
    interviewer.name.toLowerCase().includes(search.toLowerCase())
  );

  const fetchInterviewers = async () => {
    const interviewersList = await getInterviewers();
    setInterviewers(interviewersList.data);
  };

  useEffect(() => {
    fetchInterviewers();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Interviewers</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search for interviewers"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInterviewers.map((interviewer, index) => (
                <tr key={interviewer._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={interviewer.profilePicture || "https://via.placeholder.com/40"} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{interviewer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiMail className="text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{interviewer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{interviewer.mobile}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {interviewer.isApproved ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <FiCheckCircle className="mr-1" /> Approved
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        <FiXCircle className="mr-1" /> Not Approved
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <Link to={`/admin/interviewer/${interviewer._id}`}>
                      <button className="text-blue-600 hover:text-blue-900 flex items-center justify-center">
                        <FiEye className="mr-1" /> View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Interviewers;