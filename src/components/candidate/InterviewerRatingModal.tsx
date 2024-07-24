import  { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { giveInterviewerRating } from "../../api/candidateApi";
import toast from "react-hot-toast";
import { IScheduledInterview } from "../../pages/candidate/OutsourcedInterviews";

interface IProps {
  open: boolean;
  onClose: ()=> void;
  interview: IScheduledInterview

}

const InterviewerRatingModal: React.FC<IProps> = ({ open, onClose, interview }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({ rating: "", comment: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { rating: "", comment: "" };
    if (rating === 0) {
      newErrors.rating = "Please select a rating";
      isValid = false;
    }
    if (comment.trim() === "") {
      newErrors.comment = "Please provide some comments";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRatingSubmit = async () => {
    if (validateForm()) {

      try {
        const response = await giveInterviewerRating(
          interview.interviewerId,
          interview._id,
          rating,
          comment
        );
        if (response.success) {
          toast.success(
            "Thank you for your feedback! Your rating has been submitted.",
            {
              style: {
                border: "1px solid #28a745", // Green border
                padding: "16px",
                color: "#155724", // Dark green text
                backgroundColor: "#d4edda", // Light green background
              },
              iconTheme: {
                primary: "#28a745",
                secondary: "#155724",
              },
            }
          );
        }
      } catch (error) {
        // Toast for when an error occurs
        toast.error("Something went wrong. Please try again later.", {
          style: {
            border: "1px solid #dc3545", // Red border
            padding: "16px",
            color: "#721c24", // Dark red text
            backgroundColor: "#f8d7da", // Light red background
          },
          iconTheme: {
            primary: "#dc3545",
            secondary: "#721c24",
          },
        });
      }
      onClose();
    }
  };

  return (
    <Dialog open={open} size="sm" handler={onClose}>
      <DialogHeader className="flex flex-col items-start">
        <Typography variant="h4">Rate Your Interview Experience</Typography>
      </DialogHeader>
      <DialogBody divider>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      className="hidden"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      className="cursor-pointer transition-colors duration-200"
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      size={40}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
            {errors.rating && (
              <Typography color="red" className="mt-1 text-sm">
                {errors.rating}
              </Typography>
            )}
          </div>
          <Typography color="blue-gray" className="font-medium">
            Your rating: {rating} out of 5
          </Typography>
          <div className="w-full">
            <Textarea
              label="Comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
            {errors.comment && (
              <Typography color="red" className=" text-sm">
                {errors.comment}
              </Typography>
            )}
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="outlined" color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={handleRatingSubmit}>
          Submit Rating
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default InterviewerRatingModal;
