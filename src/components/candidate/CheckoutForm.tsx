import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

interface ICheckOutForm {
  isOpen: boolean;
  onClose: () => void;
  onSubscriptionComplete: () => void;
}

interface JwtPayload {
  id: string
}

const CheckoutForm = ({isOpen, onClose, onSubscriptionComplete}: ICheckOutForm) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [priceId, setPriceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [candidateId, setCandidateId] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const token = localStorage.getItem("candidateInfo");
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      setCandidateId(decoded?.id);
    }
  }, []);

  const createSubscription = async () => {
    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet. Please try again.");
      return;
    }

    if (!name || !email || !priceId) {
      toast.error("Please fill in all fields and select a plan.");
      return;
    }

    try {
      setIsLoading(true);

      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardElement)!,
        billing_details: {
          name,
          email,
        },
      });

      if (!paymentMethod || !paymentMethod.paymentMethod) {
        throw new Error("Failed to create payment method");
      }

      const response = await fetch(
        "https://www.mockq.abhinandk.online/api/payment/create-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethod: paymentMethod?.paymentMethod?.id,
            name,
            email,
            priceId,
            candidateId,
          }),
        }
      ).then((res) => res.json());

      if (!response.success || !response.data.clientSecret) {
        throw new Error("Failed to create subscription on the backend");
      }


      const confirmPayment = await stripe?.confirmCardPayment(
        response.data.clientSecret,
        { payment_method: paymentMethod.paymentMethod.id }
      );

      if (confirmPayment?.error) {
        throw new Error(confirmPayment.error.message);
      }

      setIsSuccess(true);
      setTimeout(() => {
        // navigate("/candidate/community-chat");
        onSubscriptionComplete();
      }, 3000);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.message || "An error occurred during payment processing"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const prices = [
    {
      id: "price_1Pau4fDL3WwyDt3n0YXj6oIo",
      name: "Pro",
      price: "499/year",
      disabled: false,
    },
    { id: "price_9101", name: "Enterprise", price: "999/year", disabled: true },
  ];

  const renderContent = () => {
    if (isSuccess) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="mb-4">Thank you for upgrading to Premium.</p>
          <p className="mb-4">
            You'll be redirected to the Community Chat in a few seconds.
          </p>
          <p className="text-sm text-gray-500">
            Check your email for the invoice.
          </p>
        </motion.div>
      );
    }

    return (
      <>
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Upgrade to Premium
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-700">Select Plan</label>
            <div className="flex flex-col space-y-2">
              {prices.map((price) => (
                <label
                  key={price.id}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    disabled={price.disabled}
                    type="radio"
                    value={price.id}
                    checked={priceId === price.id}
                    onChange={(e) => setPriceId(e.target.value)}
                    className="form-radio text-indigo-600"
                  />
                  <span className="text-gray-800">
                    {price.name} - {price.price}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="bg-gray-100 p-4 rounded">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <button
            onClick={createSubscription}
            disabled={!stripe || isLoading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin inline-block mr-2" />
                Processing...
              </>
            ) : (
              "Subscribe Now"
            )}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-2"
          >
            Cancel
          </button>
        </div>
      </>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl"
          >
            {renderContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutForm;
