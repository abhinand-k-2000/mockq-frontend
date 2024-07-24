import frontend from '/frontend.svg'

import { FaSearch } from "react-icons/fa";

const StackDisplay = () => {
  return (
    <div className="h-screen bg-[#D9E9FF] flex justify-center items-center ">
      <div className="text-center flex flex-col justify-center items-center space-y-5 ">

        <h1 className="text-4xl font-semibold text-[#142057]">
          Supercharge Your Interview Success
        </h1>
        <p className="text-lg text-[#142057]">
          Unlock Your Potential with Effortless Interview Outsourcing
        </p>

        <div className="relative w-3/4 ">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            className="w-full outline-none rounded-2xl bg-[#EEF5FF] pl-10 p-2 "
            placeholder="Search Profile"
          />
        </div>

        <div className="flex space-x-5">
        <img className="w-16" src={frontend}/>
        <img className="w-16" src={frontend}/>
        <img className="w-16" src={frontend}/>
        <img className="w-16" src={frontend}/>
        </div>
      

      </div>
    </div>
  );
};

export default StackDisplay;
