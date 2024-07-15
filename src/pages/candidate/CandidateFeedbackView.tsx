import { useState, useEffect } from "react";
import { getFeebackDetails } from "../../api/candidateApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CandidateNavbar from "../../components/candidate/CandidateNavbar";



const CandidateFeedbackView = () => {
  const { interviewId } = useParams();
  const [feedbackDetails, setFeedbackDetails] = useState(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbackDetails = async (interviewId: string) => {
      if (interviewId) {
        try {
          const response = await getFeebackDetails(interviewId);
          if (response.success) {
            setFeedbackDetails(response.data);
            setStatus("success");
          } else {
            setStatus("error");
          }
        } catch (error) {
          setStatus("error");
          toast.error("An error occured while fetching feedback");
        }
      }
    };

    if (interviewId) {
      fetchFeedbackDetails(interviewId);
    }
  }, [interviewId]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="animate-pulse text-white text-2xl font-semibold">
          Loading feedback...
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <>
        <CandidateNavbar />
      <div className="flex items-center bg-[#EEF5FF] justify-center min-h-screen">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Feedback Not Updated
          </h2>
          {/* <p className="mt-2 text-gray-600">The interviewer hasn't submitted the feedback for this interview yet.</p> */}
          <p className="mt-2 text-gray-600">
            The interviewer will submit feedback only after the interview has
            concluded. Please check back later to view the feedback.
          </p>
          <button
            onClick={() => navigate("/candidate/outsourced-interviews")}
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Go Back
          </button>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-indigo-600 ml-5 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Refresh Page
          </button>
        </div>
      </div>
      </>
    );
  }

  const timing = `${new Date(
    feedbackDetails.interviewDetails.fromTime
  ).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} -
  ${new Date(feedbackDetails.interviewDetails.toTime).toLocaleTimeString(
    "en-IN",
    { hour: "2-digit", minute: "2-digit" }
  )}`;

  return (

    <div className="flex flex-col min-h-screen">

      <div className="sticky top-0 z-10" >

    <CandidateNavbar />
      </div>

    
    <div className=" flex-grow flex items-center justify-center p-28">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-102 transition-all duration-300">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <h2 className="text-4xl font-extrabold text-white text-center relative z-10">
            Interview Feedback
          </h2>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "Interviewer",
                value: feedbackDetails.feedback.interviewer?.name,
                icon: "👤",
              },
              {
                label: "Candidate",
                value: feedbackDetails.feedback.candidate?.name,
                icon: "🎓",
              },
              {
                label: "Date",
                value: new Date(feedbackDetails.interviewDetails.date)
                  .toLocaleDateString("en-IN", {
                    month: "long",
                    day: "2-digit",
                  })
                  .replace(/(\d+) (\w+)/, "$2 $1"),
                icon: "📅",
              },
              { label: "Time", value: timing, icon: "🕒" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-indigo-600">
                      {item.label}
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {[
              "technicalSkills",
              "communicationSkills",
              "problemSolvingSkills",
            ].map((skill, index) => (
              <div
                key={skill}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-indigo-700 mb-3 flex items-center">
                  <span className="mr-2">{["💻", "🗣️", "🧠"][index]}</span>
                  {skill.split(/(?=[A-Z])/).join(" ")}
                </h3>
                <p className="text-gray-700 font-medium">
                  {feedbackDetails.feedback[skill]}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {[
              {
                field: "strength",
                icon: "💪",
                color: "from-green-50 to-emerald-50",
              },
              {
                field: "areaOfImprovement",
                icon: "🚀",
                color: "from-yellow-50 to-amber-50",
              },
              {
                field: "additionalComments",
                icon: "💬",
                color: "from-pink-50 to-rose-50",
              },
            ].map(({ field, icon, color }) => (
              <div
                key={field}
                className={`bg-gradient-to-br ${color} p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300`}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">{icon}</span>
                  {field.split(/(?=[A-Z])/).join(" ")}
                </h3>
                <p className="text-gray-700">
                  {feedbackDetails.feedback[field]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CandidateFeedbackView;
