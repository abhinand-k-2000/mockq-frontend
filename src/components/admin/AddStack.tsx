import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { addStack } from "../../api/adminApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface stackData {
    stackName: string,
    technologies: string[]
}

const AddStack = () => {

  const navigate = useNavigate()
  const { register, handleSubmit, setValue, getValues, watch,  formState:{errors, isValid} } = useForm();

  const stackName = watch('stackName')
  const technologies = watch('technologies')

  const isValidated = stackName && technologies.length > 0


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
    const response = await addStack(data as { stackName: string; technologies: string[] })
    if(response.success){
        toast.success("Stack added successfully!")
        navigate('/admin/stacks')
    }else {
        console.log(response)
        toast.error(response.message || "Something went wrong")
    }
    } catch (error) {
        console.log("Error: ", error)
        toast.error("An unexpected error occurred");
    }
  }

  return (
    <div >
      <h1 className="text-2xl shadow-md p-2 text-center m-5 font-semibold">Add New Stack</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        
      <em>Enter Name of Stack</em>  
      <input
        type="text"
        placeholder="Name of stack"
        className="w-full p-2 my-2 border-2 border-gray-300 rounded-md"
        {...register("stackName", { required: true })}
      />
      {errors.stackName  &&  <p  className="text-red-500 text-sm m-0 p-0">Stack is required</p>}

      <em>Add Technologies</em>
      <TagsInput
      
        value={getValues("technologies") || []}
        onChange={(tags) => setValue("technologies", tags)}
        name="technologies"
        placeHolder="Enter technology"
        
      />
        <button
          type="submit"
          className={`${
            isValidated? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded mt-4" : "bg-gray-400 cursor-not-allowed disabled text-white font-bold py-2 px-4 rounded mt-4" 
          }`}
        >
          Submit
        </button>
      </form>

    </div>
  );
};

export default AddStack;
