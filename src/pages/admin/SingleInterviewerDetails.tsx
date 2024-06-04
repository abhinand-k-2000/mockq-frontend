import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { approveInterviewer, getInterviewerDetails } from "../../api/adminApi";
import toast from "react-hot-toast";
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
  hasCompletedDetails: boolean
}

const SingleInterviewerDetails = () => {
  const [interviewerDetails, setInterviewerDetails] =
    useState<InterviewerDetails | null>(null);

    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => setOpenModal(!openModal);

  const { id } = useParams<{ id: string }>();

  const fetchInterviewerDetails = async (id: string) => {
    try {
      const response = await getInterviewerDetails(id);
      if (response.success) {
        setInterviewerDetails(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResume = () => {
    if (interviewerDetails?.resume) {
      window.open(interviewerDetails.resume);
    }
  };

  const handleSalarySlip = () => {
    if (interviewerDetails?.salarySlip) {
      window.open(interviewerDetails.salarySlip);
    }
  };

  const handleApproval = async () => {
    try {
      const response = await approveInterviewer(id as string);
      if (response) {
        setOpenModal(!openModal)
        toast.success("Interviewer Approved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInterviewerDetails(id);
    }
  }, [openModal]);

  return (
    <>

    {/*----------------------------------- Modal for block/unblock confirmation--------------------------------------------- */}

    <Dialog open={openModal} handler={handleOpenModal}>
        <DialogHeader>Are you sure you want to approve this interviewer?</DialogHeader>
        <DialogBody>
        By approving, the selected interviewer will be granted access to the full features of the website. This includes posting interviews and managing candidate appointments.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleApproval}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/*-----------------------------------End of Modal for block/unblock confirmation--------------------------------------------- */}



      <div className="flex flex-col pb-14 bg-blue-100">
        <div className="self-center mt-14 w-full max-w-[1295px] max-md:mt-10 px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col px-5 text-3xl font-medium text-black max-md:mt-10">
                <img
                  src={
                    interviewerDetails?.profilePicture ||
                    "https://mockq-bucket.s3.ap-south-1.amazonaws.com/profilePictures/1717224557042-WhatsApp%20Image%202024-05-21%20at%2000.11.37_30a0915b.jpg"
                  }
                  loading="lazy"
                  alt="Profile"
                  className="w-full"
                />
                <div className="mt-7 font-medium  text-sm">
                  Name:{" "}
                  <span className="text-xl mx-3 font-bold">
                    {interviewerDetails?.name}
                  </span>
                </div>
                <div className="mt-7 font-medium text-sm">
                  Email:{" "}
                  <span className="text-lg mx-3 font-bold">
                    {interviewerDetails?.email}
                  </span>
                </div>
                <div className="mt-7 font-medium text-sm">
                  Mobile:{" "}
                  <span className="text-xl mx-3 font-bold">
                    {interviewerDetails?.mobile}
                  </span>
                </div>
              </div>
            </div>


            <div className="flex flex-col ml-5 w-[77%]  max-md:ml-0 max-md:w-full">

              <div className="flex flex-col grow px-14 pt-10 pb-5 w-full text-xl font-medium text-black bg-blue-50 rounded-md max-md:px-5 max-md:mt-10 max-md:max-w-full">


              {
                interviewerDetails?.hasCompletedDetails ? (
                  <>
                  <div className="text-lg font-bold max-md:max-w-full">
                  Introduction
                </div>
                <div className="mt-4 max-md:max-w-full text-gray-700">
                  {interviewerDetails?.introduction}
                </div>
                <div className="mt-7 text-lg font-bold max-md:max-w-full">
                  Current Designation
                </div>
                <div className="mt-3 max-md:max-w-full text-gray-700">
                  {interviewerDetails?.currentDesignation}
                </div>
                <div className="mt-7 text-lg font-bold max-md:max-w-full">
                  Years Of Experience
                </div>
                <div className="mt-3 max-md:max-w-full text-gray-700">
                  {interviewerDetails?.yearsOfExperience}
                </div>
                <div className="mt-8 text-lg font-bold max-md:max-w-full">
                  Organisation
                </div>
                <div className="mt-3 max-md:max-w-full text-gray-700">
                  {interviewerDetails?.organisation}
                </div>
                <div className="mt-14 text-lg font-bold max-md:mt-10 max-md:max-w-full">
                  Salary Slip
                </div>
                <div>
                  <button
                    onClick={handleSalarySlip}
                    className="bg-black text-white py-2 px-4 rounded-lg mt-4"
                  >
                    View
                  </button>
                </div>
                <div className="mt-11 text-lg font-bold max-md:mt-10 max-md:max-w-full">
                  Resume
                </div>

                <div>
                  <button
                    onClick={handleResume}
                    className="bg-black text-white py-2 px-4 rounded-lg mt-4"
                  >
                    View
                  </button>
                </div>

                <div className="flex gap-5 justify-between self-end mt-44 text-white whitespace-nowrap max-md:mt-10">
                  {interviewerDetails?.isApproved ? (
                    <a
                     
                      className="justify-center px-6 py-3 text-[#4A934A] max-md:px-5"
                    >
                      Interviewer Approved
                    </a>
                  ) : (
                    <button
                      // onClick={handleApproval}
                      onClick={handleOpenModal}
                      className="cursor-pointer justify-center px-6 py-3.5 bg-[#4A934A] rounded-md hover:bg-[#3B763B] max-md:px-5"
                    >
                      Approve
                    </button>
                  )}
                </div></>
                ) : (
                  <h1 className="font-medium  text-center">The interviewer's profile registration is incomplete</h1>
                )
              }


                


              </div>
            </div>




          </div>
        </div>
      </div>
    </>
  );
};

export default SingleInterviewerDetails;
