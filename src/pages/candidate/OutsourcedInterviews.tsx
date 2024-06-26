import { useEffect, useState } from "react";
import CandidateNavbar from "../../components/candidate/CandidateNavbar";
import { getScheduledIinterviews } from "../../api/candidateApi";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface IScheduledInterview {
  _id: string;
  date: Date;
  fromTime: Date;
  toTime: Date;
  description: string;
  title: string;
  price: number;
  interviewerId: string;
  candidateId: string;
  status: string
}

const OutsourcedInterviews = () => {
  const [scheduledInterviews, setScheduledInterviews] = useState<IScheduledInterview[]>([]);
  const [openModal, setOpenModal] = useState(false)
  const [selectedInterview, setSelectedInterview] = useState<IScheduledInterview | undefined>(undefined)

  const fetchScheduledInterviews = async () => {
    const response = await getScheduledIinterviews();
    setScheduledInterviews(response.data);
  };

  const formatDate = (isoDate: Date) => {
    const dateObj = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const handleOpenModal = (interview: IScheduledInterview) => {
    setSelectedInterview(interview)
    setOpenModal(true)
    console.log(interview)
  }
  const formatTime = (isoDate: Date) => {
    const dateObj = new Date(isoDate);
    let hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = hours.toString().padStart(2, '0');
    
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    fetchScheduledInterviews();
  }, []);
  return (
    <>

     {/*----------------------------------- Modal for block/unblock confirmation--------------------------------------------- */}

     <Dialog 
  open={openModal} 
  handler={() => setOpenModal(false)} 
  className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
>
  <DialogHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-t-lg">
    <h2 className="text-2xl font-bold">{selectedInterview?.title}</h2>
  </DialogHeader>
  
  <DialogBody className="flex flex-col items-start justify-between space-y-6 p-6">
    <div className="flex items-center space-x-4">
      <div className="bg-blue-100 p-3 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p className="text-sm text-gray-500">From</p>
        <p className="text-lg font-semibold">{selectedInterview?.fromTime ? formatTime(selectedInterview.fromTime) : "Not specified"}</p>
      </div>
    </div>
    
    <div className="flex items-center space-x-4">
      <div className="bg-indigo-100 p-3 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p className="text-sm text-gray-500">To</p>
        <p className="text-lg font-semibold">{selectedInterview?.toTime ? formatTime(selectedInterview.toTime) : "Not specified"}</p>
      </div>
    </div>
  </DialogBody>
  
  <DialogBody className="p-6 bg-gray-50 rounded-b-lg">
    <h3 className="text-lg font-semibold mb-2">Description</h3>
    <p className="text-gray-700 leading-relaxed">{selectedInterview?.description}</p>
  </DialogBody>
  
  <DialogFooter className="flex justify-center py-4 bg-white">
    <Button   
      color="green"
      onClick={() => setOpenModal(false)}
      className="px-6 py-2 bg-gradient-to-r from-[#1B57F5] to-[#1442E1] text-white font-semibold rounded-full shadow-md hover:from-[#1736B6] hover:to-[#19328F] transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
    >
      Ok
    </Button>
  </DialogFooter>
</Dialog>

      {/*-----------------------------------End of Modal for block/unblock confirmation--------------------------------------------- */}


      <CandidateNavbar />
      <div className="min-h-screen flex flex-col bg-[#EEF5FF] p-24">
        <div className="max-w-7xl text-[#142057] mx-auto w-full">
          <h1 className="text-xl  font-bold mb-4">Outsourced Interviews</h1>
          <p className="font-normal mb-10">
            Find expert interviewers to take interviews on your behalf
          </p>

          <div className="flex flex-col">
  <div className="overflow-x-auto">
    <div className="p-1.5 w-full inline-block align-middle">
      <div className="overflow-hidden border rounded-lg shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-[#2F76FF] to-[#19328F]">
            <tr>
              {['ROLL NAME', 'SCHEDULED ON', 'PRICE', 'STATUS'].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-4 text-xs font-bold text-left text-white uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scheduledInterviews.map((interview: IScheduledInterview) => (
              <tr 
                key={interview._id} 
                className="hover:bg-gray-50 transition-colors duration-200 ease-in-out cursor-pointer" 
                onClick={() => handleOpenModal(interview)}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {interview.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                  {formatDate(interview.date)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                  <div className="flex items-center">
                    <MdOutlineCurrencyRupee className="text-green-500 mr-1" />
                    <span>{interview.price}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    interview.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {interview.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </>
  );
};

export default OutsourcedInterviews;
