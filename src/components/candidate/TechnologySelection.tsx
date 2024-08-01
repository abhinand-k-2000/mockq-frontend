import  { useEffect, useState } from "react";
import { home } from "../../api/candidateApi";
import toast from "react-hot-toast";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import StacksSelectionShimmer from "../shimmer/StacksSelectionShimmer";

interface Stack {
    stackName: string;
    technologies: string[];
  }

const TechnologySelection = ({
  selectedStack,
  onSelectTech,
  onSelectStack,
}: any) => {



  const [techs, setTechs] = useState<string[]>([]);
  const [searchWord, setSearchWord] = useState("")
  const [loading, setLoading] = useState(true)


  const filteredTechs = techs.filter((item) => item.toLowerCase().includes(searchWord.toLowerCase()))

  const fetchAllStacks = async () => {
    try {
      const response = await home();
      const stack = response.data.stacks.find(
        (item: Stack) => item.stackName === selectedStack
      );

      if(stack.length === 0){
        toast.error("No interviewers!")
        return
      }
      
      setTechs(stack.technologies);
      setLoading(false)
    } catch (error) {
      toast.error("No interviewers!")
      console.error("Error fetching stacks:", error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchAllStacks();
  }, [selectedStack]);


  if(loading) return <StacksSelectionShimmer heading={selectedStack}/>
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#EEF5FF] to-[#D9E9FF] px-4 sm:px-6 lg:px-8">
      <div className="w-1/2 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => onSelectStack("")}
              className="mr-4 p-2 rounded-full text-indigo-600 hover:bg-[#D9E9FF] transition duration-300"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <h1 className="text-4xl sm:text-5xl font-bold text-indigo-900">
              {selectedStack}
            </h1>
          </div>
          
          <div className="relative mb-8">
            <input
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              type="text"
              placeholder="Search by technologies"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
  
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {filteredTechs.map((tech, index) => (
              <button
                key={index}
                onClick={() => onSelectTech(tech)}
                className="bg-gradient-to-r from-[#1D2B6B] to-[#142057] hover:from-[#2A3F7E] hover:to-[#0A102E] text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D2B6B]"
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologySelection;
