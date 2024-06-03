import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStacks } from "../../api/adminApi";



const Stacks = () => {
    const navigate = useNavigate()
    const [stacksList, setStacksList] = useState([])

    const fetchStacks = async () => {
        const response = await getStacks()
        console.log("response in side component: ", response)
        if(response.success){
            setStacksList(response.data)
        }
        console.log('stack list: ', stacksList)

    }


    useEffect(() => {
        fetchStacks()
    }, [])

  return (
    <>
      <div className=" ">
        <div className="text-end">
          <button onClick={()=> navigate('/admin/add-stack')} className="bg-blue-600 py-2 px-4 rounded-md">
            Add Stack
          </button>
        </div>
      </div>

      <div className="flex flex-wrap space-x-10">

        {
            stacksList.map((stack) => (
                <div className="relative flex justify-between flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                <div className="p-6">
                  <h5 className="block text-center mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {stack.stackName}
                  </h5>

                  <ul className="list-disc p-5">
                    {
                        stack.technologies.map((item) =><li  >{item}</li> )
                    }
                    
                  </ul>
                </div>
                <div className="p-6 pt-0 text-end">
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
        }

        

      </div>
    </>
  );
};

export default Stacks;
