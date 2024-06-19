import React, { useEffect, useState } from "react";
import CandidateNavbar from "../../components/candidate/CandidateNavbar";
import { getInterviewerSlotDetails } from "../../api/candidateApi";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

interface Schedule {
    from: string;
    to: string;
    title: string;
    price: number;
    description: string;
    status: string;
  }
  
  interface Slot {
    date: string;
    schedule: Schedule;
  }
  
  interface ISlotsProps {
    slots: Slot[];
  }
  
interface IInterviewer {
    name: string,
    currentDesignation: string;
    organisation: string;
    profilePicture: string;
    yearsOfExperience: string
}

const InterviewerAndSlotDetails = () => {
  const { interviewerId } = useParams();
  const navigate = useNavigate()

  const [interviewer, setInterviewer] = useState<IInterviewer>();
  const [slots, setSlots] = useState<ISlotsProps>();

  const fetchInterviewerSlotDetails = async (interviewerId: string) => {
    const response = await getInterviewerSlotDetails(interviewerId);
    setInterviewer(response.data.details.interviewerDetails);
    setSlots(response.data.details.interviewSlotDetails);

  };

  useEffect(() => {
    if (interviewerId) {
      fetchInterviewerSlotDetails(interviewerId);
    }
  }, []);

  return (
    <>
      <CandidateNavbar />

      <div className="py-24 flex bg-[#D9E9FF] ">
        <div className="w-2/3 p-4 pt-10 bg-[#EEF5FF] h-screen">
          <div className="flex space-x-5 ml-2">
          <FaArrowLeftLong
            onClick={() => navigate("/candidate/home") }
            className="cursor-pointer text-3xl"
          />
          <h1 className="text-2xl font-bold mb-4">Book your slots</h1>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-10 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  From
                </th>
                <th scope="col" className="px-6 py-3">
                  To
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {/* {slots && ( */}
              <tbody>
                {slots && slots.map((slot, index) => (
                  <React.Fragment key={slot._id+index}>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {new Date(slot?.slots.date).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                              }
                            )}
                          </div>
                        </div>
                      </th>

                      <td className="px-6 py-4">
                        {new Date(slot.slots.schedule.from).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(slot.slots.schedule.to).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          {slot.slots.schedule.title}
                        </a>
                      </td>
                      <td className="px-6 py-4">{slot.slots.schedule.price}</td>
                      <td className="px-6 py-4">
                        {slot.slots.schedule.description}
                      </td>
                      <td className={`px-6 py-4`}>
                        {slot.slots.schedule.status}
                      </td>
                      <td className="px-6 py-4">
                        <button className="bg-green-500 text-white px-3 rounded-sm py-1">
                          Book
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            {/* )} */}
          </table>
        </div>

        <div className="w-1/3 p-4 border-l border-gray-200 ">
          {interviewer && (
            <div className="text-center bg-[#EEF5FF] rounded-lg shadow-lg p-6">
              <div className="w-full">
                <img
                  src={interviewer.profilePicture}
                  alt="Interviewer"
                  className="h-40 w-40 rounded-full mx-auto mb-4 border-4 border-gray-300 shadow-sm"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {interviewer.name}
              </h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Designation:</span>{" "}
                {interviewer.currentDesignation}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Organisation:</span>{" "}
                {interviewer.organisation}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Years Of Experience:</span>{" "}
                {interviewer.yearsOfExperience}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InterviewerAndSlotDetails;
