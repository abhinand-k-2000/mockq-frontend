import  { useEffect, useState } from "react";
import { home } from "../../api/candidateApi";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from "react-hot-toast";

interface Stack {
    stackName: string;
    technologies: string[];
  }

const TechnologySelection = ({
  selectedStack,
  onSelectTech,
  onSelectStack,
}: any) => {

  console.log('Inside tech selection')


  const [techs, setTechs] = useState<string[]>([]);
  const [searchWord, setSearchWord] = useState("")


  const filteredTechs = techs.filter((item) => item.toLowerCase().includes(searchWord.toLowerCase()))

  const fetchAllStacks = async () => {
    try {
      const response = await home();
      const stack = response.data.stacks.find(
        (item: Stack) => item.stackName === selectedStack
      );
      console.log("stack: ", stack)

      if(stack.length === 0){
        toast.error("No interviewers!")
        return
      }
      
      setTechs(stack.technologies);
    } catch (error) {
      toast.error("No interviewers!")
      console.error("Error fetching stacks:", error);
    }
  };

  useEffect(() => {
    fetchAllStacks();
  }, [selectedStack]);
  return (
    <>
      <div className="flex justify-center items-center px-16 py-20 bg-[#D9E9FF] max-md:px-5">
        <div className="flex flex-col px-20 py-7 mt-24 max-w-full bg-[#EEF5FF] rounded-md w-[736px] max-md:px-5 max-md:mt-10">
          <div className=" flex space-x-5  ml-9 text-5xl font-semibold text-[#142057] max-md:max-w-full max-md:text-4xl">
            <FaArrowLeftLong
              onClick={() => onSelectStack("")}
              className="cursor-pointer"
            />
            <h1>{selectedStack}</h1>
          </div>
          <div className="flex gap-2 items-start py-5 mt-5 text-base  rounded-md text-black text-opacity-70 max-md:flex-wrap">
            <div className="flex-auto max-md:max-w-full">
              <input
                value={searchWord}
                onChange={(e)=> setSearchWord(e.target.value)}
                type="text"
                placeholder="Search by technologies"
                className="bg-[#D9E9FF] placeholder-opacity-50  placeholder-blue-gray-500 p-2 w-full rounded-md text-sm"
              />
            </div>
          </div>

          <div className="flex justify-center w-full mt-8 max-w-full">
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
              {filteredTechs.map((tech, index) => (
                <div
                  key={index}
                    onClick={()=> onSelectTech(tech)}
                  className={`bg-[#142057] cursor-pointer flex justify-center items-center px-6 rounded-md h-[133px] w-[133px] text-white text-base font-semibold`}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechnologySelection;
