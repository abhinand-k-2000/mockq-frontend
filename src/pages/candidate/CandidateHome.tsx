import { useEffect, useState } from "react";
import CandidateNavbar from "../../components/candidate/CandidateNavbar";
import { home } from "../../api/candidateApi";


interface Stack {
  stackName: string;
  technologies: string[];
}

const CandidateHome = () => {
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [search, setSearch] = useState('')


  

  const handleSearch = (word: string) => {
    setSearch(word)
  }

  const fetchAllStacks = async () => {
    try {
      const response = await home();
      console.log(response)
      setStacks(response.data.stacks);
    } catch (error) {
      console.error("Error fetching stacks:", error);
    }
  };

  useEffect(() => {
    fetchAllStacks();
  }, []);

  const filteredStacks = stacks.filter((stacks) => stacks.stackName.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <CandidateNavbar />

      <div className="flex justify-center items-center px-16 py-20 bg-[#D9E9FF] max-md:px-5">
        <div className="flex flex-col px-20 py-7 mt-24 max-w-full bg-[#EEF5FF] rounded-md w-[736px] max-md:px-5 max-md:mt-10">
          <div className="self-start ml-9 text-5xl font-semibold text-[#142057] max-md:max-w-full max-md:text-4xl">
            Request Interviewer
          </div>
          <div className="flex gap-2 items-start py-5 mt-5 text-base  rounded-md text-black text-opacity-70 max-md:flex-wrap">
            {/* <img
            loading="lazy"
            src="path/to/image" // Replace with actual image source
            className="shrink-0 aspect-[0.89] w-[17px]"
            alt="Icon"
          /> */}
            <div className="flex-auto max-md:max-w-full">
              <input
                value={search}
                onChange={(e)=> handleSearch(e.target.value)}
                type="text"
                placeholder="Search by profile roles"
                className="bg-[#D9E9FF] placeholder-opacity-50  placeholder-blue-gray-500 p-2 w-full rounded-md text-sm"
              />
            </div>
          </div>

          <div className="flex justify-center w-full mt-8 max-w-full">
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
              {filteredStacks.map((stack, index) => (
                <div
                  key={index}
                  className={`bg-[#142057] cursor-pointer flex justify-center items-center px-6 rounded-md h-[133px] w-[133px] text-white text-base font-semibold`}
                >
                  {stack.stackName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateHome;
