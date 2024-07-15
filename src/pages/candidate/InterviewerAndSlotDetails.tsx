import React, { useEffect, useState } from "react";
import CandidateNavbar from "../../components/candidate/CandidateNavbar";
import { getInterviewerSlotDetails, makePayment } from "../../api/candidateApi";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaCode, FaDollarSign, FaInfoCircle } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";

interface Schedule {
  from: string;
  to: string;
  title: string;
  price: number;
  description: string;
  status: string;
  technologies: string[];
}

interface Slot {
  _id: string;
  date: string;
  schedule: Schedule;
}

interface ISlotsProps {
  slots: Slot[];
}

interface IInterviewer {
  name: string;
  currentDesignation: string;
  organisation: string;
  profilePicture: string;
  yearsOfExperience: string;
}

const InterviewerAndSlotDetails = () => {
  const { interviewerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedTech } = location.state || {}; // Retrieving selected tech from state


  const handleCheckout = async (slot: any) => {
    console.log("data: ", slot);

    const response = await makePayment(slot);

    console.log("respnse: ", response);
    if (response.success) {
      window.location = response.data;
    }
 
  };

  const [interviewer, setInterviewer] = useState<IInterviewer>();
  const [slots, setSlots] = useState<any>();

  const fetchInterviewerSlotDetails = async (
    interviewerId: string,
    techName: string
  ) => {
    const response = await getInterviewerSlotDetails(interviewerId, techName);
    if (response && response.data) {
      setInterviewer(response.data.details.interviewerDetails);
      setSlots(response.data.details.interviewSlotDetails);
    } else {
      console.error("API response is missing data:", response);
    }
  };

  useEffect(() => {
    if (interviewerId) {
      fetchInterviewerSlotDetails(interviewerId, selectedTech);
    }
  }, []);

  return (
    <>
      <CandidateNavbar />
      <div className="min-h-screen bg-gradient-to-br bg-[#EEF5FF]  py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#EEF5FF] rounded-xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 p-6 lg:p-10">
              <div className="flex items-center mb-8">
                <button 
                  onClick={() => navigate("/candidate/home")}
                  className="mr-4 p-2 rounded-full  text-indigo-600 hover:bg-[#D9E9FF] transition duration-300"
                >
                  <FaArrowLeft className="text-xl" />
                </button>
                <h1 className="text-3xl lg:text-4xl font-bold text-indigo-900">Book your slots</h1>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3">Time (from & to)</th>
                      <th scope="col" className="px-6 py-3">Domain</th>
                      {/* <th scope="col" className="px-6 py-3">Technologies</th> */}
                      <th scope="col" className="px-6 py-3">Price</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {slots && slots.map((slot: any, index: number) => (
                      <tr key={slot._id + index} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4  items-center font-medium text-gray-900">
                          {/* <FaCalendarAlt className="inline mr-2 text-indigo-600" /> */}
                          {new Date(slot?.slots.date).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                        </td>
                        <td className="px-6 py-4 ">
                          {/* <FaClock className="inline mr-2 text-indigo-600" /> */}
                          {new Date(slot.slots.schedule.from).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} - {' '}
                          {new Date(slot.slots.schedule.to).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="px-6 py-4 font-medium text-indigo-600 hover:text-indigo-900">
                          {slot.slots.schedule.title}
                        </td>
                        {/* <td className="px-6 py-4">
                          <FaCode className="inline mr-2 text-indigo-600" />
                          {slot.slots.schedule.technologies.map((item: any) => item.toUpperCase()).join(", ")}
                        </td> */}
                        <td className="px-6 flex items-center py-4">
                          {/* <FaDollarSign className="inline mr-1 text-green-600" /> */}
                          <MdOutlineCurrencyRupee />
                          {slot.slots.schedule.price}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            slot.slots.schedule.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {slot.slots.schedule.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {slot.slots.schedule.status === "open" ? (
                            <button
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                              onClick={(e) => {
                                e.preventDefault();
                                handleCheckout(slot);
                              }}
                            >
                              Book
                            </button>
                          ) : (
                            <button className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed" disabled>
                              Unavailable
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:w-1/3 p-6 lg:p-10  border-l border-indigo-100">
              {interviewer && (
                <div className="text-center bg-white rounded-xl shadow-lg p-8">
                  <img
                    src={interviewer.profilePicture}
                    alt="Interviewer"
                    className="h-48 w-48 rounded-full mx-auto mb-6 border-4 border-indigo-200 shadow-lg"
                  />
                  <h2 className="text-3xl font-bold mb-4 text-indigo-900">{interviewer.name}</h2>
                  <div className="space-y-3 text-left">
                    <p className="text-gray-700">
                      <span className="font-semibold text-indigo-600">Designation:</span>{" "}
                      {interviewer.currentDesignation}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-indigo-600">Organisation:</span>{" "}
                      {interviewer.organisation}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-indigo-600">Experience:</span>{" "}
                      {interviewer.yearsOfExperience} years
                    </p>
                  </div>
                  <div className="mt-6 p-4 bg-indigo-100 rounded-lg">
                    <FaInfoCircle className="inline mr-2 text-indigo-600" />
                    <span className="text-sm text-indigo-800">Expert in {selectedTech}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewerAndSlotDetails;
