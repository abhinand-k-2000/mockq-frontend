import { motion } from 'framer-motion';
import main from '/main.png'

import { FaRocket, FaUserTie, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LandingHero = () => {
  return (
    <div className="bg-gradient-to-r mt-28 rounded-lg from-blue-900 to-blue-700 text-white overflow-hidden">
      <div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-12 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Elevate Your <span className="text-blue-300">Interview Skills</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Gain confidence and excel in your job interviews with personalized coaching from industry experts.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { icon: FaRocket, text: "Tailored 1-on-1 Sessions" },
                { icon: FaUserTie, text: "4000+ Expert-led Interviews" },
                { icon: FaStar, text: "4.96 Average Rating" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <item.icon className="text-blue-300 text-xl" />
                  <span className="text-lg">{item.text}</span>
                </div>
              ))}
            </div>
           <Link to="/sign-up">
           <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold text-lg shadow-lg hover:bg-blue-100 transition-all duration-300"
            >
              Start Your Journey
            </motion.button>
           </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
              <img 
                src={main}
                alt="Professional interview preparation" 
                className="relative z-10 w-full max-w-md mx-auto rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
      </div>
    </div>
  );
};

export default LandingHero;

// import { motion } from 'framer-motion';
// import { FaStar, FaUserTie } from 'react-icons/fa';
// import main from '/main.png'

// const LandingHero = () => {
//   return (
//     <div className="container mx-auto px-6 py-24 md:py-32">
//       <div className="flex flex-col md:flex-row items-center justify-between">
//         <motion.div 
//           className='flex flex-col max-w-xl mb-10 md:mb-0'
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
//             Land Your <span className="text-blue-600">Dream</span> Job
//           </h1>  

//           {/* <h1 className="text-4xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
//               Land Your <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-[#c6dcec]">Dream </span> Job
//              </h1> */}


//           <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
//             1-on-1 interview preparation sessions
//           </h2>
//           <p className="text-gray-600 mb-8 text-lg">
//             Elevate your interview game! Professionals from top tech companies offer mock interviews and dedicated mentorship sessions, gearing you up for success.
//           </p>
//           <div className='flex items-center space-x-8 mb-8'>
//             <div className="flex items-center">
//               <FaUserTie className="text-blue-600 mr-2 text-xl" />
//               <span className="font-semibold text-blue-900">4000+<span className='text-gray-600'> sessions coached</span></span>
//             </div>
//             <div className="flex items-center">
//               <FaStar className="text-yellow-400 mr-2 text-xl" />
//               <span className="font-semibold text-blue-900">4.96 <span className='text-gray-600'>average rating</span></span>
//             </div>
//           </div>
//           <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg">
//             Get Started
//           </button>
//         </motion.div>
//         <motion.div 
//           className='w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0'
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <img src={main} alt="Interview preparation" className='w-full max-w-md rounded-lg shadow-2xl' />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LandingHero;









// import { motion } from 'framer-motion';
// import { FaStar, FaUserTie } from 'react-icons/fa';
// import main from '/main.png'


// const LandingHero = () => {
//   return (
//     <div className=" p-20  rounded-lg ">
//       <div className="container bg-gradient-to-r from-[#f6f8fce3] to-[#e9f2ff]  rounded-lg mx-auto px-4 sm:px-6 lg:px-8  ">
//         <div className='flex flex-col md:flex-row items-center justify-between'>
//           <motion.div 
//             className='flex flex-col max-w-xl mb-10 md:mb-0'
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-4xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
//               Land Your <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-[#c6dcec]">Dream </span> Job
//             </h1>
//             <h5 className="text-xl md:text-2xl font-semibold text-gray-600 mb-6">
//               1-on-1 interview preparation sessions
//             </h5>
//             <p className="text-gray-700 mb-2  text-lg">
//               Elevate your interview game! Professionals from top tech companies offer mock interviews and dedicated mentorship sessions, gearing you up for success.
//             </p>

//             <div className='flex items-center space-x-5'>

//             <div className="flex items-center ">
//               <FaUserTie className="text-blue-700 mr-2" />
//               <span className="font-semibold text-blue-900">4000+<span  className='text-gray-600'>  sessions coached</span></span>
//             </div>

//             <div className="flex items-center ">
//               <FaStar className="text-yellow-400 mr-2" />
//               <span className="font-semibold text-blue-900">4.96 <span className='text-gray-600'>average rating</span></span>
//             </div>
            
//             </div>
    
//           </motion.div>

//           <motion.div 
//             className='w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0'
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <img src={main} alt="Interview preparation" className='w-full max-w-md rounded-lg ' />
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingHero;