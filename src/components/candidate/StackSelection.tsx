import  { useEffect, useState } from 'react'
import { home } from '../../api/candidateApi';
import { FaSearch } from 'react-icons/fa';



interface Stack {
    stackName: string;
    technologies: string[];
  }

const StackSelection = ({onSelectStack}: any) => {
    console.log('Inside stack selection')

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#EEF5FF] to-[#D9E9FF] px-4 sm:px-6 lg:px-8">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">

        <div className="px-6 py-8 sm:p-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-900 mb-8">
            Request Interviewer
          </h1>
          
          <div className="relative mb-8">
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder="Search by profile roles"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {filteredStacks.map((stack, index) => (
              <button
                key={index}
                onClick={() => onSelectStack(stack.stackName)}
                className="bg-gradient-to-r from-[#1D2B6B] to-[#142057] hover:from-[#2A3F7E] hover:to-[#0A102E] text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D2B6B]"
                >
                {stack.stackName}
              </button>

              
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StackSelection