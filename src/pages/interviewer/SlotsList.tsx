import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSlotsList } from "../../api/interviewerApi";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ApprovalPopup = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4">Not Approved</h2>
      <p className="mb-4">You are not approved by the admin to add slots.</p>
      <button 
        onClick={onClose}
        className="bg-[#142057] text-white py-2 px-4 ml-auto block rounded-md"
      >
        Close
      </button>
    </div>
  </div>
);

interface Schedule {
  from: string;
  to: string;
  title: string;
  price: number;
  description: string;
  status: 'open' | 'booked';
  technologies: string[];
}

interface Slot {
  date: Date;
  schedule: Schedule[];
}

// interface InterviewSlot {
//   interviewerId: string;
//   slots: Slot[];
// }

const SlotsList = () => {
  const navigate = useNavigate();
  const [slotsList, setSlotsList] = useState<Slot[]>([]);
  const [showPopUp, setShowPopUp] = useState(false)

  const interviewerInfo = useSelector((state: RootState) => state.auth.interviewerInfo);


  const handleAddSlot = () => {
    console.log(interviewerInfo);
    if (!interviewerInfo || !interviewerInfo.isApproved) {
      setShowPopUp(true)
      // alert("You are not approved by the admin");
      return;
    }
    navigate("/interviewer/add-slot");
  };
  

  const fetchInterviewSlotsList = async () => {
    const response = await getSlotsList();
    if (response.success) {
      setSlotsList(response.data);
    }
  };

  useEffect(() => {
    fetchInterviewSlotsList();
  }, []);

  return (
    <>

    {
      showPopUp && <ApprovalPopup onClose={() => setShowPopUp(false)}/>
    }
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className=" shadow-md flex flex-col space-y-2 rounded-md p-10 ">
          <h1 className="text-3xl font-semibold">Interviews List</h1>
          <p>See information about all interviews</p>
          <div className="text-end">
            <button
              onClick={handleAddSlot}
              className="bg-[#142057]  text-white py-3 px-4 rounded-md"
            >
              Add Slot
            </button>
          </div>
        </div>

        <div className=" m-4 flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for interviews"
            />
          </div>
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
                Domain
              </th>
              <th scope="col" className="px-6 py-3">
                Technologies
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
          <tbody>
            {slotsList.map((slot, slotIndex) => (
              <React.Fragment key={slotIndex}>
                {slot.schedule.map((schedule, scheduleIndex) => (
                  <tr
                    key={`${slotIndex}-${scheduleIndex}`}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {new Date(slot?.date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      {new Date(schedule.from).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(schedule.to).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {schedule.title}
                      </a>
                    </td>
                    {/* <td className="px-6 font-semibold py-4">{schedule.technologies.join(', ')}</td> */}
                    <td className="px-6 font-semibold py-4">{schedule.technologies.map(item => item.toUpperCase()).join(', ')}</td>
                    <td className="px-6 py-4">{schedule.price}</td>
                    <td className="px-6 py-4">{schedule.description}</td>
                    <td className={`px-6 py-4`}>{schedule.status}</td>
                    <td className="px-6 py-4">
                      <button>
                        <MdOutlineEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SlotsList;
