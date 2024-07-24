import { motion } from 'framer-motion';
import main from '/main.png'

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Find your interviewer or mentor",
      description: "Browse and find interviewers from top companies best matching your targeted position, and book a session with them.",
      image: main // Replace with actual image path
    },
    {
      number: "2",
      title: "Participate in your session",
      description: "Join the call with your interviewers and mentors on the scheduled time. The style of the mock interviews are in the way that you expect in a job interview.",
      image: "/path-to-your-image-2.jpg" 
    },
    {
      number: "3",
      title: "Get a top-notch reliable feedback",
      description: "Practice on the areas for improvement based on the provided feedback. Learn, strengthen your skills, and go on to get your dream job!",
      image: "/path-to-your-image-3.jpg"
    }
  ];

  return (
    <section className="bg-gradient-to-r rounded-lg from-[#f6f8fce3] to-[#e9f2ff] py-16  mt-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">How It Works?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-6xl font-bold text-blue-200 mr-4">{step.number}</span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-6">{step.description}</p>
                {/* <div className="w-1/3  aspect-h-9">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="object-cover rounded-lg"
                  />
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;