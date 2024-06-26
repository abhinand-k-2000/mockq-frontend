import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { approveInterviewer, getInterviewerDetails } from "../../api/adminApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiBriefcase, FiClock, FiBook, FiFileText, FiCheckCircle } from "react-icons/fi";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface InterviewerDetails {
  name: string;
  email: string;
  mobile: number;
  isApproved: boolean;
  yearsOfExperience: string;
  currentDesignation: string;
  organisation: string;
  collegeUniversity: string;
  introduction: string;
  profilePicture: string;
  salarySlip: string;
  resume: string;
  hasCompletedDetails: boolean;
}

const SingleInterviewerDetails: React.FC = () => {
  const [interviewerDetails, setInterviewerDetails] = useState<InterviewerDetails | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchInterviewerDetails(id);
    }
  }, [id, openModal]);

  const fetchInterviewerDetails = async (id: string) => {
    try {
      const response = await getInterviewerDetails(id);
      if (response.success) {
        setInterviewerDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching interviewer details:", error);
      toast.error("Failed to fetch interviewer details");
    }
  };

  const handleOpenModal = () => setOpenModal(!openModal);

  const handleApproval = async () => {
    try {
      const response = await approveInterviewer(id as string);
      if (response) {
        setOpenModal(false);
        toast.success("Interviewer Approved");
        fetchInterviewerDetails(id as string);
      }
    } catch (error) {
      console.error("Error approving interviewer:", error);
      toast.error("Failed to approve interviewer");
    }
  };

  const handleDocumentView = (url?: string) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      toast.error("Document not available");
    }
  };

  if (!interviewerDetails) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br  min-h-screen py-10 px-4">
      <ApprovalModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onApprove={handleApproval}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="md:flex">
          <ProfileSidebar interviewer={interviewerDetails} />
          <MainContent
            interviewer={interviewerDetails}
            onDocumentView={handleDocumentView}
            onApprove={() => setOpenModal(true)}
          />
        </div>
      </motion.div>
    </div>
  );
};

const ProfileSidebar: React.FC<{ interviewer: InterviewerDetails }> = ({ interviewer }) => (
  <div className="md:w-1/3  p-8 text-white">
    <motion.img
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      src={interviewer.profilePicture || "https://via.placeholder.com/150"}
      alt={interviewer.name}
      className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
    />
    <DetailItem icon={<FiUser />} label="Name" value={interviewer.name} />
    <DetailItem icon={<FiMail />} label="Email" value={interviewer.email} />
    <DetailItem icon={<FiPhone />} label="Mobile" value={interviewer.mobile.toString()} />
  </div>
);

const MainContent: React.FC<{
  interviewer: InterviewerDetails;
  onDocumentView: (url?: string) => void;
  onApprove: () => void;
}> = ({ interviewer, onDocumentView, onApprove }) => (
  <div className="md:w-2/3 p-8">
    {interviewer.hasCompletedDetails ? (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <h2 className="text-3xl font-bold mb-6 text-indigo-900">Professional Profile</h2>
        <DetailItem icon={<FiBriefcase />} label="Current Designation" value={interviewer.currentDesignation} />
        <DetailItem icon={<FiClock />} label="Years of Experience" value={interviewer.yearsOfExperience} />
        <DetailItem icon={<FiBook />} label="Organisation" value={interviewer.organisation} />
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-indigo-900">Introduction</h3>
          <p className="text-gray-700 leading-relaxed">{interviewer.introduction}</p>
        </div>
        
        <div className="mt-8 space-y-4">
          <DocumentButton icon={<FiFileText />} label="View Salary Slip" onClick={() => onDocumentView(interviewer.salarySlip)} />
          <DocumentButton icon={<FiFileText />} label="View Resume" onClick={() => onDocumentView(interviewer.resume)} />
        </div>

        {!interviewer.isApproved && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onApprove}
            className="mt-8 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Approve Interviewer
          </motion.button>
        )}
      </motion.div>
    ) : (
      <div className="text-center text-gray-600">
        <h2 className="text-3xl font-bold mb-4 text-indigo-900">Incomplete Profile</h2>
        <p className="text-xl">The interviewer's profile registration is incomplete.</p>
      </div>
    )}
  </div>
);

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="mb-4 flex items-center">
    <div className="text-2xl mr-3">{icon}</div>
    <div>
      <h3 className="text-sm font-semibold opacity-75">{label}</h3>
      <p className="text-lg">{value}</p>
    </div>
  </div>
);

const DocumentButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
  >
    <span className="mr-2">{icon}</span>
    {label}
  </motion.button>
);

const ApprovalModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
}> = ({ open, onClose, onApprove }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: open ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className={`fixed inset-0 z-50 flex items-center justify-center ${open ? '' : 'pointer-events-none'}`}
  >
    <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: open ? 1 : 0.9, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-8 shadow-2xl relative z-10 max-w-md w-full"
    >
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">Confirm Approval</h2>
      <p className="text-gray-700 mb-6">
        Are you sure you want to approve this interviewer? They will be granted access to post interviews and manage candidate appointments.
      </p>
      <div className="flex justify-end space-x-4">
        <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Cancel
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onApprove}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        >
          Confirm Approval
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
  </div>
);

export default SingleInterviewerDetails;