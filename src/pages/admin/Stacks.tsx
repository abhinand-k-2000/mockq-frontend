import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getStacks, unlistStack } from "../../api/adminApi";
import toast from "react-hot-toast";
import {Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography,} from "@material-tailwind/react";

interface Stack {
  _id: string,
  stackName: string,
  technologies: string[],
  isListed: boolean
}

const Stacks = () => {
  const navigate = useNavigate();
  const [stacksList, setStacksList] = useState([]);

  const [unlistedStacksList, setUnlistedStacksList] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const fetchStacks = async () => {
    const response = await getStacks();
    if (response.success) {
      const listedStacks = response.data.filter((stack: Stack) => stack.isListed);
      const unListedStacks = response.data.filter((stack: Stack) => !stack.isListed);
      setStacksList(listedStacks);
      setUnlistedStacksList(unListedStacks);
    }
  };

  const handleUnlist = async (stackId: string) => {
    const response = await unlistStack(stackId);
    if (response.data) {

      if (response.data.isListed) {
        toast.success("Stack Listed");
      }else {
        toast.success("Stack Unlisted")
      }
      fetchStacks();
      return;
    }
    toast.error("Something went wrong in unlisting stack!");
  };

  useEffect(() => {
    fetchStacks();
  }, []);

  return (
    <>
      <div className=" ">
        <div className="text-end space-x-8">
          <button
            onClick={() => navigate("/admin/add-stack")}
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Add Stack
          </button>
          <button
            onClick={handleOpen}
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Unlisted Stacks
          </button>
        </div>
      </div>

      <div className="flex flex-wrap space-x-10">
        {stacksList.map((stack: Stack) => (
          <div
            key={stack._id}
            className="relative flex justify-between flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
          >
            <div className="p-6">
              <h5 className="block text-center mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {stack.stackName}
              </h5>

              <ul className="list-disc p-5">
                {stack.technologies.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 pt-0 text-end">
              <button
                onClick={() => handleUnlist(stack._id)}
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Unlisted Stacks</DialogHeader>
        <DialogBody>
          <Typography className="font-normal">

            {unlistedStacksList.map((stack: Stack) => (
              <div
                key={stack._id}
                className="bg-blue-gray-50 rounded-lg shadow-md m-3 p-5 flex justify-between"
              >
                <h4 className="font-bold text-black text-xl">
                  {stack.stackName}    
                </h4>
                <button
                  onClick={() => handleUnlist(stack._id)}
                  className="bg-green-500 text-white py-2 px-3 rounded-md"
                >
                  List
                </button>
              </div>
            ))}
          </Typography>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default Stacks;
