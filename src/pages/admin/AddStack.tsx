import { TagsInput } from "react-tag-input-component";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { addStack } from "../../api/adminApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiPackage, FiPlus, FiChevronLeft } from 'react-icons/fi';

interface StackData {
  stackName: string;
  technologies: string[];
}

const AddStack = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<StackData>();

  const stackName = watch("stackName");
  const technologies = watch("technologies");

  const isValidated = stackName && technologies?.length > 0;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await addStack(data as StackData);
      if (response.success) {
        toast.success("Stack added successfully!");
        navigate("/admin/stacks");
      } else {
        console.log(response);
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FiPackage className="mr-2" />
          Add New Stack
        </h1>
        <button
          onClick={() => navigate("/admin/stacks")}
          className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out flex items-center"
        >
          <FiChevronLeft className="mr-1" /> Back to Stacks
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="stackName" className="block text-sm font-medium text-gray-700 mb-1">
            Name of Stack
          </label>
          <input
            id="stackName"
            type="text"
            placeholder="Enter stack name"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
            {...register("stackName", { required: "Stack name is required" })}
          />
          {errors.stackName && (
            <p className="text-red-500 text-sm mt-1">{errors.stackName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-1">
            Technologies
          </label>
          <TagsInput
            value={getValues("technologies") || []}
            onChange={(tags) => setValue("technologies", tags)}
            name="technologies"
            placeHolder="Enter technology and press enter"
            classNames={{
              input: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out",
              tag: "bg-blue-100 text-blue-800 rounded-full px-2 py-1 m-1 text-sm",
            }}
          />
        </div>

        <button
          type="submit"      
          disabled={!isValidated}
          className={`w-full flex items-center justify-center ${
            isValidated
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out`}
        >
          <FiPlus className="mr-2" /> Add Stack
        </button>
      </form>
    </div>
  );
};

export default AddStack;