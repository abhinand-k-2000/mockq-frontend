import InterviewerNavbar from '../../components/interviewer/InterviewerNavbar'
import { MdCurrencyRupee  } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";



const InterviewerHome = () => {
  return (
    <div>
      <InterviewerNavbar/>
      <div className="flex justify-center items-center px-16 py-20 bg-blue-100 max-md:px-5">
      <div className="mt-16 w-full max-w-[1296px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-black max-md:mt-10 max-md:max-w-full">
              <div className="text-2xl font-semibold max-md:max-w-full">
                Your Interviews
              </div>
              <div className="flex z-10 gap-5 items-start self-start mt-14 text-xl font-medium max-md:mt-10">
                <div className="flex flex-col whitespace-nowrap">
                  <div>All</div>
                  <div className="shrink-0 mt-4 h-0.5 bg-blue-700 border-2 border-blue-700 border-solid" />
                </div>
                <div className="flex-auto">Upcoming (0)</div>
              </div>
              <div className="shrink-0 h-px border border-solid bg-black bg-opacity-70 border-black border-opacity-70 max-md:max-w-full" />
            </div>
          </div>
          <div className="flex  flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
            <div className="flex rounded-md flex-col grow px-7 py-12 mt-6 w-full font-medium text-black bg-blue-50 shadow-sm max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <div className="self-start  ml-3 text-2xl font-semibold max-md:ml-2.5">
                Payment
              </div>
              <div className="flex gap-5 px-7 py-6 mt-9 text-base bg-blue-100 rounded-md max-md:px-5">
                <div className="flex-auto">Approved Interviews</div>
                <div className="self-start">1</div>
              </div>
              <div className="flex gap-5 px-7 py-6 mt-8 text-base bg-blue-100 rounded-md max-md:px-5">
                <div className="flex-auto">Approval Pending</div>
                <div className="self-start">0</div>
              </div>
              <div className="flex gap-5 px-7 py-6 mt-8 text-base bg-blue-100 rounded-md max-md:px-5">
                <div className="flex-auto">Report Rejected</div>
                <div className="self-start">0</div>
              </div>
              <div className="flex flex-col items-start py-6 pr-14 pl-6 mt-7 w-full font-semibold bg-blue-100 shadow-sm max-md:px-5">
                <div className="text-base font-medium">Available Payment</div>
                <div className="flex gap-0.5 mt-4 text-4xl whitespace-nowrap">
                  {/* <img
                    loading="lazy"
                    srcSet="..."
                    className="shrink-0 w-full aspect-square"
                  /> */}
                  <MdCurrencyRupee  />
                  <div className="my-auto">0</div>
                </div>
                <div className=" text-center bg-[#008080] self-end px-16 py-3.5 mt-8 max-w-full text-xl text-white whitespace-nowrap rounded-md bg-neutral-600 w-[266px] max-md:px-5">
                  Withdraw
                </div>
              </div>
              <div className="flex gap-5  items-center py-5  pr-3.5 pl-7 mt-7 text-base bg-white rounded-md max-md:pl-5">
                <div className="flex-auto">Payment History</div>
                <FaArrowRight />

                {/* <img
                  loading="lazy"
                  srcSet="..."
                  className="shrink-0 aspect-[1.23] w-[31px]"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default InterviewerHome