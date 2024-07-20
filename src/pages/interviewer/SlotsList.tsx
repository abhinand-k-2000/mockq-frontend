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
  status: "open" | "booked";
  technologies: string[];
}

interface Slot {
  date: Date;
  schedule: Schedule[];
}

const SlotsList = () => {
  const navigate = useNavigate();
  const [slotsList, setSlotsList] = useState<Slot[]>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [slotsPerPage] = useState(5);

  const interviewerInfo = useSelector(
    (state: RootState) => state.auth.interviewerInfo
  );

  const handleAddSlot = () => {
    if (!interviewerInfo || !interviewerInfo.isApproved) {
      setShowPopUp(true);
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

  // Pagination logic
  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = slotsList.slice(indexOfFirstSlot, indexOfLastSlot);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-full mx-auto">
        {showPopUp && <ApprovalPopup onClose={() => setShowPopUp(false)} />}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="px-4 sm:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h1 className="text-4xl sm:text-4xl font-bold text-gray-800">
                  Slots List
                </h1>
                <p className="text-gray-600 mt-1">
                  See information about all time slots
                </p>
              </div>
              <button
                onClick={handleAddSlot}
                className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Add Slot
              </button>
            </div>

            <div className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search for interviews"
                />
                <div className="absolute left-3 top-2.5">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TableComponent currentSlots={currentSlots} />

        <Pagination
          slotsPerPage={slotsPerPage}
          totalSlots={slotsList.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

// Table component
const TableComponent = ({ currentSlots }: { currentSlots: Slot[] }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Date",
                "From",
                "To",
                "Domain",
                "Technologies",
                "Price",
                "Status",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className={`px-3 sm:px-6 py-3 ${header === 'Action' ? "text-right" : "text-left"} text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentSlots.map((slot, slotIndex) =>
              slot.schedule.map((schedule, scheduleIndex) => (
                <tr
                  key={`${slotIndex}-${scheduleIndex}`}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(slot?.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(schedule.from).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(schedule.to).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <a
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:text-blue-900"
                    >
                      {schedule.title}
                    </a>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {schedule.technologies
                        .map((item) => item.toUpperCase())
                        .join(", ")}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {schedule.price}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${schedule.status === 'booked' ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <MdOutlineEdit className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Pagination component
const Pagination = ({
  slotsPerPage,
  totalSlots,
  paginate,
  currentPage,
}: {
  slotsPerPage: number;
  totalSlots: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalSlots / slotsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 rounded-md ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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

export default SlotsList;
