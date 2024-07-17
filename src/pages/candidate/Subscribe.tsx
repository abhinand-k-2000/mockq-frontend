import { useState } from "react";
import CandidateNavbar from "../../components/candidate/CandidateNavbar";
import CheckoutForm from "../../components/candidate/CheckoutForm";
import CommunityChat from "./CommunityChat";

const Subscribe = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscriptionComplete = () => {
    setIsSubscribed(true);
    setIsCheckoutOpen(false);
  };

  if (isSubscribed) {
    return <CommunityChat />;
  }

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for getting started",
      features: [
        "Allow free users to book a certain number of mock interview slots per month.",
        "Receive basic feedback from interviewers without detailed analysis.",
        "Basic email support for technical issues.",
      ],
      cta: "Free",
      ctaStyle:
        "text-indigo-600 cursor-not-allowed bg-white hover:bg-indigo-50  border border-indigo-600 ",
      icon: "🚀",
    },
    {
      name: "Pro",
      price: "499",
      description: "For serious learners and professionals",
      features: [
        "Access to dedicated chat rooms where premium members can discuss interview experiences and share tips",
        "Connect with other candidates who have attended similar interviews.",
        "Receive faster responses from customer support",
      ],
      cta: "Subscribe",
      ctaStyle: "text-white bg-indigo-600 hover:bg-indigo-700",
      popular: true,
      icon: "⭐",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-[#D9E9FF] min-h-screen">
      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubscriptionComplete={handleSubscriptionComplete}
      />

      <CandidateNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Choose Your <span className="text-indigo-600">Perfect Plan</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock your potential with our tailored subscription options.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col rounded-xl border-2 border-gray-200 bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* {plan.popular && (
                <div className="absolute top-0 right-0 -mt-4 mr-4 py-1.5 px-4 text-sm font-semibold bg-indigo-600 text-white rounded-full uppercase tracking-wider shadow-lg">
                  Most popular
                </div>
              )} */}
              <div className="flex items-center mb-2">
                <span className="text-3xl mr-2">{plan.icon}</span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>
              </div>
              <p className="mb-8 flex items-baseline text-gray-900">
                <span className="text-3xl font-extrabold tracking-tight">
                  {plan.price}
                </span>
                <span className="ml-1 text-2xl font-semibold text-gray-500">
                  /year
                </span>
              </p>
              <p className="mb-4 text-lg text-gray-700">{plan.description}</p>
              <ul className="mb-6 space-y-2 text-sm text-gray-600">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-2 flex-shrink-0 text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className={`block w-full rounded-xl px-4 py-2 text-center text-lg font-semibold ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
