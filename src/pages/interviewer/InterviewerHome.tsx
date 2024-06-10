
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { homeDetails } from "../../api/interviewerApi";

interface Interviewer {
  name: string
  currentDesignation: string
  introduction: string
  organisation: string
  yearsOfExperience: number
}

const InterviewerHome = () => {


  const [interviewerDetails, setInterviewerDetails] = useState<Interviewer>()

  const fetchHomeDetails = async () =>{ 

    const response = await homeDetails()
    setInterviewerDetails(response.data.interviewer)
  }

  useEffect(() => {
    fetchHomeDetails()
  }, [])
  
  return (
    <>
      <div className="flex flex-col space-y-5  w-full">
        <div>
          <h2 className="font-bold text-2xl p-3 bg-[#EEF5FF] text-[#142057] shadow-lg rounded-sm">
            My Profile
          </h2>
        </div>

        <div className="px-9 pt-6 pb-14 bg-[#EEF5FF] text-[#142057] rounded-xl max-md:px-5">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex-grow w-full max-md:ml-0">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0 mt-5 max-md:mt-10">
                <div className="flex flex-col w-[68%] max-md:w-full">
                  <div className="text-base font-medium text-blue-950 max-md:mt-10">
                    <div className="text-3xl font-bold">{interviewerDetails?.name}</div>
                    <div className="mt-5">{interviewerDetails?.currentDesignation}</div>
                    <div className="mt-12 text-xl max-md:mt-10 font-semibold">
                      About
                    </div>
                    <div className="mt-4 font-light text-black">
                    {interviewerDetails?.introduction}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-[32%] max-md:w-full">
                  <div className="mt-28 text-xl font-medium text-blue-950 max-md:mt-10">
                    <div className="font-semibold">Organisation</div>
                    <div className="mt-3 text-base font-light text-black">
                    {interviewerDetails?.organisation}
                    </div>
                    <div className="mt-12 max-md:mt-10 font-semibold">
                      Years of experience
                    </div>
                    <div className="mt-3 text-base font-light text-black">
                    {interviewerDetails?.yearsOfExperience} Years
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end w-[18%] max-md:w-full max-md:items-start">
              <div className="text-xl font-medium text-blue-950 max-md:mt-10">
                <div className="mb-24 max-md:mb-10">
                  <MdEdit className="cursor-pointer" />
                </div>
                <div className="mt-24 max-md:mt-10 font-semibold">Mobile</div>
                <div className="mt-4 text-base font-light text-black">
                  8089543705
                </div>
                <div className="mt-12 max-md:mt-10 font-semibold">Email</div>
                <div className="mt-4 text-base font-light text-black">
                  abhi@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewerHome;
