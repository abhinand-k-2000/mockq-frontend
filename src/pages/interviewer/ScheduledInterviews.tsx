import { useEffect, useState } from "react";
import { getSchedulesInterviews } from "../../api/interviewerApi";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { MdVideoCameraBack } from "react-icons/md";

interface ScheduledInterview {
  _id: string;
  date: Date;
  fromTime: Date;
  toTime: Date;
  description: string;
  title: string;
  price: number;
  interviewerId: string;
  candidateId: string;
  status: string;
  roomId: string;
}

const ScheduledInterviews = () => {
  const [scheduledInterviews, setScheduledInterviews] = useState<ScheduledInterview[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [interviewsPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchScheduledInterviews = async () => {
    const response = await getSchedulesInterviews();
    setScheduledInterviews(response.data);
  };

  const handleJoinCall = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    fetchScheduledInterviews();
  }, []);

  // Get current interviews
  const indexOfLastInterview = currentPage * interviewsPerPage;
  const indexOfFirstInterview = indexOfLastInterview - interviewsPerPage;
  const currentInterviews = scheduledInterviews.slice(indexOfFirstInterview, indexOfLastInterview);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Scheduled Interviews
            </h1>
            <p className="text-gray-600">
              See information about all interviews
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Domain
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feedback
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentInterviews.map((interview, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(interview.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaRegClock className="h-5 w-5 mr-2 text-gray-400" />
                      {new Date(interview.fromTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" - "}
                      {new Date(interview.toTime).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-sm font-medium rounded-full">
                      {interview.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                      interview.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {interview.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {interview.status !== "Completed" ? (
                      <Link
                        to={`/../interviewer/feedback-form/${interview._id}`}
                        className="text-indigo-600 hover:text-indigo-900 font-medium transition duration-150 ease-in-out"
                      >
                        Add feedback
                      </Link>
                    ) : (
                      <span className="flex items-center text-green-600 font-medium">
                        <FaRegCheckCircle className="h-5 w-5 mr-1" />
                        Feedback Added
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {interview.status === "Completed" ? (
                      <span className="text-gray-500 font-medium">
                        Interview Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => handleJoinCall(interview?.roomId)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                      >
                        <MdVideoCameraBack className="h-5 w-5 mr-2" />
                        Join Call
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          interviewsPerPage={interviewsPerPage}
          totalInterviews={scheduledInterviews.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

// Pagination component
const Pagination = ({ interviewsPerPage, totalInterviews, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalInterviews / interviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center">
        {pageNumbers.map(number => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 rounded-md ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ScheduledInterviews;