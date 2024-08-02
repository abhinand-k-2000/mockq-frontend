import  { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSlotsList } from "../../api/interviewerApi";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Pagination from "../../components/Pagination";
import TableShimmer from "../../components/shimmer/TableShimmer";
import {debounce} from "lodash"

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
  const [loading, setLoading] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")

  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "4");

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

  const fetchInterviewSlotsList = async (page: number, limit: number, query = "") => {
    setLoading(true)
    const response = await getSlotsList(page, limit, query);
    if (response.success) {
      console.log('data: ', response.data)
      setSlotsList(response.data);
      setTotalPages(Math.ceil(response.total / limit));
      setLoading(false)
    }
  };


  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  // const debounceFetch = useCallback(debounce(fetchInterviewSlotsList, 300), [])
  const debounceFetch = useCallback(
    debounce((query: string) =>{
      fetchInterviewSlotsList(currentPage, limit, query)
    }, 800), [currentPage, limit]
  )

  useEffect(() => {
    // fetchInterviewSlotsList(currentPage, limit);
    fetchInterviewSlotsList(currentPage, limit, searchQuery)
  }, [currentPage, limit]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    setSearchQuery(e.target.value.trim())
    debounceFetch(e.target.value.trim())
  }
  console.log('search query: ', searchQuery)

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {showPopUp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold mb-4">Not Approved</h2>
              <p className="mb-4">
                You are not approved by the admin to add slots.
              </p>
              <button
                onClick={() => setShowPopUp(false)}
                className="bg-[#142057] text-white py-2 px-4 ml-auto block rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="px-4 sm:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
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
                  onChange={handleSearchChange}
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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">  
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
                    // "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className={`px-6 py-3 ${
                        header === "Action" ? "text-right" : "text-left"
                      } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              {
            loading ? (
              <TableShimmer columns={7}/>
            ) : (
              <tbody className="bg-white divide-y divide-gray-200">
                {slotsList?.map((slot, slotIndex) =>
                  slot?.schedule?.map((schedule, scheduleIndex) => (
                    <tr
                      key={`${slotIndex}-${scheduleIndex}`}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(slot?.date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(schedule.from).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(schedule.to).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        
                          <a href="#"
                          className="text-sm font-medium text-blue-600 hover:text-blue-900"
                        >
                          {schedule.title}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {schedule.technologies
                            .map((item) => item.toUpperCase())
                            .join(", ")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {schedule.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            schedule.status === "booked"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {schedule.status}
                        </span>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <MdOutlineEdit className="h-5 w-5" />
                        </button>
                      </td> */}
                    </tr>
                  
                  ))
                )}
              </tbody>
              )
            }
            </table>
          </div>
            
        </div>

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};


export default SlotsList;