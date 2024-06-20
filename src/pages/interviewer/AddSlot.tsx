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
    <>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">Book a Slot</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="col-span-2">
            <label className="block text-gray-700">Select Date</label>
            <Controller
              control={control}
              name="date"
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  className="w-full p-2 border rounded-md focus:border-blue-500"
                  placeholderText="Select date"
                  minDate={new Date()}
                />
              )}
            />
            {errors.date && (
              <p className="mt-1 text-red-500 text-xs">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="start-time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Start time:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"></div>
              <input
                type="time"
                id="start-time"
                {...register("timeFrom", {
                  required: "Start time is required",
                })}
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.timeFrom && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.timeFrom.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="end-time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              End time:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"></div>
              <input
                type="time"
                id="end-time"
                {...register("timeTo", { required: "End time is required" })}
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.timeTo && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.timeTo.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select the domain
            </label>
            <select
              {...register("title", { required: "Doamin is required" })}
              defaultValue=""
              onChange={handleDomainChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Choose a domain
              </option>
              {domainsList &&
                domainsList.map((domain: Domain) => (
                  <option key={domain._id} value={domain.stackName}>
                    {domain.stackName}
                  </option>
                ))}
            </select>
            {errors.title && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Technologies</label>
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
              />
            )}
          />
        )}
        {errors.technologies && (
          <p className="mt-1 text-red-500 text-xs">
            {errors.technologies.message}
          </p>
        )}
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-2 border rounded-md focus:border-blue-500 resize-none h-20"
            />
            {errors.description && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
              className="w-full p-2 border rounded-md focus:border-blue-500"
            />
            {errors.price && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSlot;
