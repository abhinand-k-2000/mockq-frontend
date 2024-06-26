import { useForm, Controller, SubmitHandler } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addSlot, getDomains } from "../../api/interviewerApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Select from "react-select";

interface Options {
  value: string;
  label: string;
}

interface Domain {
  _id: string;
  stackName: string;
  technologies: string[];
  isListed: boolean;
}

interface Slot {
  date: Date;
  description: string;
  technologies: Options[];
  price: number;
  timeFrom: Date;
  timeTo: Date;
  title: string;
  status: "open" | "booked";
}

const AddSlot = () => {
  const [domainsList, setDomainsList] = useState<Domain[]>([]);
  const [technologies, setTechnologies] = useState<Options[]>([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    trigger
  } = useForm<Slot>({
    defaultValues: {},
  });

  const fetchDomainList = async () => {
    const response = await getDomains();
    setDomainsList(response.data);
  };

  const handleDomainChange =async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDomain = e.target.value
    const domainFullData = domainsList.filter(
      (stack) => stack.stackName === selectedDomain);
    const options: Options[] = domainFullData[0]?.technologies.map((item) => ({
      value: item,
      label: item,
    })) || [];
    setTechnologies(options);
    setValue("technologies", [])
    setValue("title", selectedDomain)
    await trigger("title")
    console.log("domain full data: ", technologies);
  };

  useEffect(() => {
    fetchDomainList();
  }, []);

  const onSubmit: SubmitHandler<Slot> = async (data: Slot) => {
    console.log("htmlForm Data:", data);

    const date = new Date(data.date);
    const dateString = date.toLocaleDateString("en-CA");

    const timeFrom = new Date(`${dateString}T${data.timeFrom}:00+05:30`);
    const timeTo = new Date(`${dateString}T${data.timeTo}:00+05:30`);

    data.timeFrom = timeFrom;
    data.timeTo = timeTo;

    if (timeFrom > timeTo) {
      toast.error("End time must be later than start time.");
      return; // Exit early if end time is earlier than start time
    }

    const response = await addSlot(data);
    if (response.success) {
      navigate("/interviewer/slots-list");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-[#142057] text-white py-6 px-8">
          <h1 className="text-3xl font-bold">Book an Interview Slot</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <Controller
                control={control}
                name="date"
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholderText="Select date"
                    minDate={new Date()}
                  />
                )}
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
            </div>

            <div>
              <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-2">Start time</label>
              <input
                type="time"
                id="start-time"
                {...register("timeFrom", { required: "Start time is required" })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.timeFrom && <p className="mt-1 text-sm text-red-600">{errors.timeFrom.message}</p>}
            </div>

            <div>
              <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-2">End time</label>
              <input
                type="time"
                id="end-time"
                {...register("timeTo", { required: "End time is required" })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.timeTo && <p className="mt-1 text-sm text-red-600">{errors.timeTo.message}</p>}
            </div>

            <div className="col-span-2">
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">Select the domain</label>
              <select
                {...register("title", { required: "Domain is required" })}
                defaultValue=""
                onChange={handleDomainChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>Choose a domain</option>
                {domainsList && domainsList.map((domain: Domain) => (
                  <option key={domain._id} value={domain.stackName}>{domain.stackName}</option>
                ))}
              </select>
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
              {technologies && (
                <Controller
                  name="technologies"
                  control={control}
                  rules={{ required: "At least one technology is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={technologies}
                      className="w-full"
                    />
                  )}
                />
              )}
              {errors.technologies && <p className="mt-1 text-sm text-red-600">{errors.technologies.message}</p>}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none h-24"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be a number" },
                })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-[#19328F] text-white font-medium rounded-md hover:bg-[#142057] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Book Slot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSlot;
