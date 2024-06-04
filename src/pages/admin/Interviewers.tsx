import React, { useEffect, useState } from "react";
import { getInterviewers } from "../../api/adminApi";
import { Link } from "react-router-dom";

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

const Interviewers = () => {
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
    <>
      <div className="p-5 bg-gray-200 rounded-md  flex items-center">
        <input
          type="text"
          className="border-black border-1 px-5 w-1/4 py-1 rounded-md "
          placeholder="Search for interviewers"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Mobile
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Approval
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInterviewers.map((interviewer, index) => (
                    <tr key={interviewer._id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {interviewer.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {interviewer.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {interviewer.mobile}
                      </td>
                      <td
                        className={`${
                          interviewer.isApproved
                            ? "px-6 py-4 text-sm text-green-600 whitespace-nowrap"
                            : "px-6 py-4 text-sm text-red-600 whitespace-nowrap"
                        } `}
                      > 
                        {interviewer.isApproved ? "Approved" : "Not Approved"}
                      </td>

                      <td className="px-6 space-x-5  py-4 text-sm font-medium text-center whitespace-nowrap">

                        <Link to={`/admin/interviewer/${interviewer._id}`}>
                        <button className="px-6 py-2 text-sm bg-black rounded-md text-white font-medium">
                          Details
                        </button>
                        </Link>

                        {/* <button
                          //   onClick={
                          //     () => handleOpenModal(candidate)
                          //     // handleBlock(candidate._id, candidate.isBlocked)
                          //   }
                          className={`${
                            interviewer.isBlocked
                              ? "px-6 py-2 text-sm bg-green-600 rounded-md text-white font-medium"
                              : "px-6 py-2 text-white rounded-md bg-red-700 text-sm font-medium"
                          }`}
                        >
                          {interviewer.isBlocked ? "Unblock" : "Block"}
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interviewers;
