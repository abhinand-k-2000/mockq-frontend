import { useEffect, useState } from "react";
import { getInterviews } from "../../api/adminApi";
import InterviewDetails from "../../components/admin/InterviewDetails";

interface ICandidate {
  name: string;
  email: string;
  mobile: string;
  isPremium: boolean;
}

interface IInterviewer {
  name: string;
  email: string;
  mobile: string;
  isPremium: boolean;
}

export interface IInterview {
  _id: string;
  date: Date;
  fromTime: Date;
  toTime: Date;
  status: string;
  title: string;
  price: number;
  description: string;
  candidate: ICandidate;
  interviewer: IInterviewer;
}

const Interviews = () => {
  const [interviews, setInterviews] = useState<IInterview[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedInterview, setSelectedInterview] = useState<IInterview | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [interviewsPerPage] = useState(3);

  useEffect(() => {
    const fetchInterviews = async () => {
      const response = await getInterviews();
      setInterviews(response.data);
    };
    fetchInterviews();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  let filteredInterviews = interviews.filter(
    (interview) =>
      (interview.candidate.name.toLowerCase().includes(search) ||
        interview.interviewer.name.toLowerCase().includes(search)) &&
      (filter === "" || interview.status.includes(filter))
  );

  const closeDetails = () => {
    setSelectedInterview(null);
  };

  const indexOfLastInterview = currentPage * interviewsPerPage;
  const indexOfFirstInterview = indexOfLastInterview - interviewsPerPage;
  const currentInterviews = filteredInterviews.slice(
    indexOfFirstInterview,
    indexOfLastInterview
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // setSearch("");
    // setFilter("")
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedInterview ? (
        <InterviewDetails
          interview={selectedInterview}
          onClose={closeDetails}
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            All Interviews
          </h1>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search by candidate or interviewer name"
              className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              onChange={handleFilter}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Filter by status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {" "}
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interviewer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentInterviews.map((interview) => (
                  <tr key={interview._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {interview._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {interview.candidate.name.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {interview.interviewer.name.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(interview.date).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                      {new Date(interview.fromTime).toLocaleTimeString(
                        "en-IN",
                        {
                          minute: "2-digit",
                          hour: "2-digit",
                        }
                      )}{" "}
                      <span className="mx-1">-</span>
                      {new Date(interview.toTime).toLocaleTimeString("en-In", {
                        minute: "2-digit",
                        hour: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        interview.status === "Scheduled"
                          ? "bg-yellow-100 text-yellow-800"
                          : interview.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                      >
                        {interview.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedInterview(interview)}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4">
            {Array.from(
              { length: Math.ceil(interviews.length / interviewsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  } rounded-md mr-2`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Interviews;
