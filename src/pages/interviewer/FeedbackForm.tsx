import { useState, useEffect } from 'react';
import { getFeedbackDetails, saveFeedback } from '../../api/interviewerApi';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Interviewer {
  _id: string;
  name: string;
  profilePicture: string;
}

interface Candidate {
  _id: string;
  name: string;
  email: string;
  mobile: number;
}

interface IFormData {
  technicalSkills: string;
  communicationSkills: string;
  problemSolvingSkills: string;
  strength: string;
  areaOfImprovement: string;
  additionalComments: string;
}

interface FeedbackDetails {
  interviewer: Interviewer;
  candidate: Candidate;
  date: string;
  fromTime: string;
  toTime: string;
}

const FeedbackForm = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormData>();

  const navigate = useNavigate();

  const [feedbackDetails, setFeedbackDetails] = useState<FeedbackDetails | undefined>(undefined);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      if (interviewId) {
        try {
          const response = await getFeedbackDetails(interviewId);
          setFeedbackDetails(response.data);
        } catch (error) {
          console.error("Error fetching interview details:", error);
          toast.error("Failed to fetch interview details");
        }
      }
    };

    fetchInterviewDetails();
  }, [interviewId]);

  const timing = feedbackDetails
    ? `${new Date(feedbackDetails.fromTime).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })} -
       ${new Date(feedbackDetails.toTime).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })}`
    : '';

  const onSubmit: SubmitHandler<IFormData> = async (formData) => {
    if (feedbackDetails && interviewId) {
      const fullDetails = {
        ...formData,
        interviewerId: feedbackDetails.interviewer._id,
        candidateId: feedbackDetails.candidate._id,
        interviewId
      };
      try {
        const response = await saveFeedback(fullDetails);
        if (response.success) {
          navigate('/interviewer/scheduled-interviews');
        } else {
          toast.error("Failed to save feedback");
        }
      } catch (error) {
        console.error("Error saving feedback:", error);
        toast.error("An error occurred while saving feedback");
      }
    } else {
      toast.error("Missing interview details");
    }
  };

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-[#142057] p-8">
          <h2 className="text-4xl font-extrabold text-white text-center">Interview Feedback</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Interviewer', value: feedbackDetails?.interviewer?.name },
              { label: 'Candidate', value: feedbackDetails?.candidate?.name },
              { label: 'Date', value: feedbackDetails ? new Date(feedbackDetails.date).toLocaleDateString("en-IN", { month: 'long', day: "2-digit" }).replace(/(\d+) (\w+)/, '$2 $1') : '' },
              { label: 'Time', value: timing },
            ].map((item, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">{item.label}</p>
                <p className="text-lg font-semibold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {['technicalSkills', 'communicationSkills', 'problemSolvingSkills'].map((skill) => (
              <div key={skill} className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {skill.split(/(?=[A-Z])/).join(' ')}
                </label>
                <div className="flex flex-wrap gap-4">
                  {skillLevels.map((level) => (
                    <label key={level} className="inline-flex items-center">
                      <input
                        {...register(skill as keyof IFormData, { required: "Please select an option" })}
                        type="radio"
                        value={level}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
                {errors[skill as keyof IFormData] && <p className='text-red-500 text-sm'>{errors[skill as keyof IFormData]?.message}</p>}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {['strength', 'areaOfImprovement', 'additionalComments'].map((field) => (
              <div key={field} className="relative">
                <textarea
                  {...register(field as keyof IFormData, { required: "Please give the feedback" })}
                  id={field}
                  rows={3}
                  className="peer w-full border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 p-2 placeholder-transparent"
                  placeholder={field.split(/(?=[A-Z])/).join(' ')}
                ></textarea>
                <label htmlFor={field} className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-sm">
                  {field.split(/(?=[A-Z])/).join(' ')}
                </label>
                {errors[field as keyof IFormData] && <p className='text-red-500 text-sm'>{errors[field as keyof IFormData]?.message}</p>}
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#19328F] text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;