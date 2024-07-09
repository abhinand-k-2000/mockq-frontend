import { useEffect, useState } from "react";
import { getSchedulesInterviews } from "../../api/interviewerApi";
import { Link, useNavigate } from "react-router-dom";


interface ScheduledInterview {
    _id: string
    date: Date;
    fromTime: Date;
    toTime: Date;
    description: string;
    title: string;
    price: number;
    interviewerId: string;
    candidateId: string
    status: string
    roomId: string
}


const ScheduledInterviews = () => {


  const [scheduledInterviews, setScheduledInterviews] = useState<ScheduledInterview[]>([]);
  const navigate = useNavigate()

  const fetchScheduledInterviews = async () => {
    const response = await getSchedulesInterviews();
    setScheduledInterviews(response.data);
  };
  console.log("scheduled: ", scheduledInterviews);

  const handleJoinCall = (roomId: string) => {

    // navigate(`/interviewer/video-call/${roomId}`)
    navigate(`/room/${roomId}`)
  }

  useEffect(() => {
    fetchScheduledInterviews();
  }, []);
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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  From
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  To
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Domain
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Feedback
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scheduledInterviews.map((interview, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(interview.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(interview.fromTime).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(interview.toTime).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {interview.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link to={`/../interviewer/feedback-form/${interview._id}`} className="cursor-pointer underline text-blue-700">
                      Add feedback
                    </Link>
                  </td>
                  
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleJoinCall(interview?.roomId)}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                      >
                        <svg
                          className="h-5 w-5 inline-block mr-2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M15 10l4.55-4.55a1 1 0 00-1.41-1.41L13.5 8.5l-2-2a1 1 0 00-1.41 0L3 14.6l1.4 1.4 7-7 2 2 5.6-5.6L20.55 10H15z"></path>
                        </svg>
                        Join Call
                      </button>
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

export default ScheduledInterviews;
