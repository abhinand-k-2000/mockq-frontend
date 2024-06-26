import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStacks, unlistStack } from "../../api/adminApi";
import toast from "react-hot-toast";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { FiPlus, FiList, FiTrash2, FiCheckSquare, FiPackage, FiLayers } from 'react-icons/fi';

interface Stack {
  _id: string;
  stackName: string;
  technologies: string[];
  isListed: boolean;
}

const Stacks = () => {
  const navigate = useNavigate();
  const [stacksList, setStacksList] = useState<Stack[]>([]);
  const [unlistedStacksList, setUnlistedStacksList] = useState<Stack[]>([]);
  const [open, setOpen] = useState(false);

  const fetchStacks = async () => {
    const response = await getStacks();
    if (response.success) {
      setStacksList(response.data.filter((stack: Stack) => stack.isListed));
      setUnlistedStacksList(response.data.filter((stack: Stack) => !stack.isListed));
    }
  };

  const handleUnlist = async (stackId: string) => {
    const response = await unlistStack(stackId);
    if (response.data) {
      toast.success(response.data.isListed ? "Stack Listed" : "Stack Unlisted");
      fetchStacks();
    } else {
      toast.error("Something went wrong in unlisting stack!");
    }
  };

  useEffect(() => {
    fetchStacks();
  }, []);

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0 text-gray-800">
            <FiPackage className="inline-block mr-2" />
            Stacks Management
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/admin/add-stack")}
              className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded transition duration-300 ease-in-out flex items-center"
            >
              <FiPlus className="mr-2" /> Add Stack
            </button>
            <button
              onClick={() => setOpen(true)}
              className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 py-2 px-6 rounded transition duration-300 ease-in-out flex items-center"
            >
              <FiList className="mr-2" /> Unlisted Stacks
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stacksList.map((stack: Stack) => (
            <div
              key={stack._id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 transition duration-300 ease-in-out hover:shadow-lg"
            >
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h5 className="text-xl font-semibold text-gray-800 truncate">{stack.stackName}</h5>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {stack.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center text-sm">
                    <FiLayers className="mr-1" /> {stack.technologies.length} technologies
                  </span>
                  <button
                    onClick={() => handleUnlist(stack._id)}
                    className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog 
        open={open} 
        handler={() => setOpen(false)} 
        size="md"
      >
        <DialogHeader className="text-2xl font-bold text-gray-800">
          <FiList className="inline-block mr-2" />
          Unlisted Stacks
        </DialogHeader>
        <DialogBody divider className="h-[400px] overflow-y-auto">
          {unlistedStacksList.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No unlisted stacks available.</p>
          ) : (
            unlistedStacksList.map((stack: Stack) => (
              <div
                key={stack._id}
                className="bg-white border border-gray-200 rounded-lg m-3 p-4 flex justify-between items-center hover:bg-gray-50 transition duration-300 ease-in-out"
              >
                <h4 className="font-semibold text-gray-800 text-lg">{stack.stackName}</h4>
                <button
                  onClick={() => handleUnlist(stack._id)}
                  className="bg-gray-800 hover:bg-gray-900 text-white py-1 px-4 rounded text-sm transition duration-300 ease-in-out flex items-center"
                >
                  <FiCheckSquare className="mr-1" /> List
                </button>
              </div>
            ))
          )}
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default Stacks;