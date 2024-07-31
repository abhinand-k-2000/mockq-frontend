import { FaCode, FaServer, FaPaintBrush, FaMobileAlt, FaDatabase, FaCloud } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DomainsCovered = () => {
    const data = [
        { name: "Full Stack", desc: "End-to-end application development", icon: FaCode },
        { name: "Backend", desc: "Server-side logic and databases", icon: FaServer },
        { name: "Frontend", desc: "User interfaces and experiences", icon: FaPaintBrush },
        { name: "Mobile", desc: "iOS and Android app development", icon: FaMobileAlt },
        { name: "Data Science", desc: "Big data and machine learning", icon: FaDatabase },
        { name: "Cloud Computing", desc: "Scalable and distributed systems", icon: FaCloud },
    ];

    return (
        <div className="bg-blue-50 py-24">
            <div className="container mx-auto px-6">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold text-blue-900 mb-4">Every Domain, Every Industry Covered</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Our mentors are equipped to guide you in any field you're passionate about</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {data.map((tech, index) => (
                        <motion.div 
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500 ease-in-out"></div>
                                <div className="relative z-10">
                                    <tech.icon className="text-5xl text-blue-600 mb-6 transform group-hover:scale-110 transition-transform duration-300" />
                                    <h3 className="text-2xl font-semibold text-blue-900 mb-3">{tech.name}</h3>
                                    <p className="text-gray-600">{tech.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DomainsCovered;























// import { FaCode, FaServer, FaPaintBrush, FaMobileAlt, FaDatabase, FaCloud } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const DomainsCovered = () => {
//     const data = [
//         { name: "Full Stack", desc: "End-to-end application development", icon: FaCode },
//         { name: "Backend", desc: "Server-side logic and databases", icon: FaServer },
//         { name: "Frontend", desc: "User interfaces and experiences", icon: FaPaintBrush },
//         { name: "Mobile", desc: "iOS and Android app development", icon: FaMobileAlt },
//         { name: "Data Science", desc: "Big data and machine learning", icon: FaDatabase },
//         { name: "Cloud Computing", desc: "Scalable and distributed systems", icon: FaCloud },
//     ];

//     return (
//         <div className="bg-gradient-to-r from-[#f6f8fce3] to-[#e9f2ff] py-16">
//             <div className="container mx-auto px-4">
//                 <motion.div 
//                     className="text-center mb-16"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                 >
//                     <h2 className="text-4xl font-bold text-gray-800 mb-4">Every Domain, Every Industry Covered</h2>
//                     <p className="text-xl text-gray-600 max-w-2xl mx-auto">Our mentors are equipped to guide you in any field you're passionate about</p>
//                 </motion.div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//                     {data.map((tech, index) => (
//                         <motion.div 
//                             key={index}
//                             className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.5, delay: index * 0.1 }}
//                         >
//                             <div className="p-8 relative overflow-hidden">
//                                 <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500 ease-in-out"></div>
//                                 <div className="relative z-10">
//                                     <tech.icon className="text-4xl text-blue-600 mb-6 transform group-hover:scale-110 transition-transform duration-300" />
//                                     <h3 className="text-2xl font-semibold text-gray-800 mb-3">{tech.name}</h3>
//                                     <p className="text-gray-600">{tech.desc}</p>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DomainsCovered;