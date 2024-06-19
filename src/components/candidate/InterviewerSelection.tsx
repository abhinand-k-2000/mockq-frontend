import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getInterviewersByTech } from "../../api/candidateApi";
import { useNavigate } from "react-router-dom";

interface Interviewer {
  _id: string;
  name: string;
  image: string;
  introduction: string;
  profilePicture: string;
}

const InterviewerSelection = ({
  selectedTech,
  onSelectInterviewer,
  onSelectTech,
}: any) => {
  console.log("inside interviewerSelection: ", selectedTech);
  const [interviewers, setInterviewers] = useState<Interviewer[]>([]);
  const navigate = useNavigate()

  const fetchInterviewersByTech = async (tech: string) => {
    const response = await getInterviewersByTech(tech);
    setInterviewers(response.data.interviewersList);
    console.log("inteviwersList: ", interviewers);
  };

  useEffect(() => {
    fetchInterviewersByTech(selectedTech);
  }, []);

  return (
    <div className="flex justify-center items-center px-16 py-20 bg-[#D9E9FF] max-md:px-5">
      <div className="flex flex-col px-20 py-7 mt-24 max-w-full bg-[#EEF5FF] rounded-md w-[736px] max-md:px-5 max-md:mt-10">
        <div className=" flex space-x-5  ml-9 text-4xl font-semibold text-[#142057] max-md:max-w-full max-md:text-4xl">
          <FaArrowLeftLong
            onClick={() => onSelectTech("")}
            className="cursor-pointer"
          />
          <h1>Interviewers for {selectedTech}</h1>
        </div>
        <div className="flex gap-2 items-start py-5 mt-5 text-base  rounded-md text-black text-opacity-70 max-md:flex-wrap">
          <div className="flex-auto max-md:max-w-full">
            <input
              // value={searchWord}
              // onChange={(e)=> setSearchWord(e.target.value)}
              type="text"
              placeholder="Search by technologies"
              className="bg-[#D9E9FF] placeholder-opacity-50  placeholder-blue-gray-500 p-2 w-full rounded-md text-sm"
            />
          </div>
        </div>

        <div className="flex justify-center w-full mt-8 max-w-full">
          {!interviewers.length ? (
            <p className="font-medium text-red-600">
              No interivewers Registered
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 max-md:grid-cols-1">
              {interviewers.map((interviewer, index) => (
                <div
                  key={index}
                //   onClick={()=> onSelectInterviewer(interviewer._id)}
                onClick={()=> navigate(`/candidate/interviewer-slot-details/${interviewer._id}`)}

                  className="bg-[#D9E9FF] cursor-pointer p-4 rounded-md shadow-lg hover:bg-[#BCD8FF] transition duration-300 ease-in-out w-full"
                >
                  <div className="flex flex-row items-start space-x-4">
                    {/* Image on the left */}
                    <img 
                      src={interviewer.profilePicture}
                      alt={interviewer.name}
                      className="w-16 h-16 "
                    />  
                    {/* Name and Introduction on the right */}
                    <div className="text-white text-base font-semibold">
                      <h3 className="text-[#142057]">{interviewer.name}</h3>
                      <p className="text-[#142057] font-normal text-sm">
                        {interviewer.introduction}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewerSelection;
