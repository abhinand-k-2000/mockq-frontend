import CandidateNavbar from '../../components/candidate/CandidateNavbar';
import { Card, CardBody, Typography, Progress } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Pie } from 'react-chartjs-2';
import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getAnalytics } from '../../api/candidateApi';


interface IAnlaytics {
    completed: number, 
    scheduled: number
}

const Analytics = () => {


  const [interviewCount, setInterviewCount] = useState<IAnlaytics>({completed: 0, scheduled: 0})

  const chartData = {
    labels: ['Scheduled', 'Completed'],
    datasets: [
      {
        data: [interviewCount.scheduled, interviewCount.completed],
        backgroundColor: ['#3b82f6', '#10b981'],
        borderColor: ['#2563eb', '#059669'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };


  useEffect(() => {

    const fetchAnalytics = async() => {
        const {data} = await getAnalytics()
        setInterviewCount(data)
    }
    fetchAnalytics()
  }, [])

  console.log("inteview count: ", interviewCount)

  return (
    <div className="min-h-screen bg-gray-100">
      <CandidateNavbar />
      <div className="container mx-auto px-4 pt-28 "> {/* Added pt-20 for top padding */}
        <Typography variant="h2" color="blue-gray" className="mb-4">
          Interview Analytics
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Total Interviews
                </Typography>
                <Typography variant="h3" color="blue-gray">
                  {interviewCount.completed + interviewCount.scheduled}
                </Typography>
                <div className="flex items-center mt-4">
                  <FaCalendarAlt className="text-blue-500 mr-2" />
                  <Typography color="gray" className="font-normal">
                    Upcoming: {interviewCount.scheduled}
                  </Typography>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Completed Interviews
                </Typography>
                <Typography variant="h3" color="blue-gray">
                  {interviewCount.completed}
                </Typography>
                <div className="flex items-center mt-4">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <Typography color="gray" className="font-normal">
                    {(interviewCount.completed / (interviewCount.completed + interviewCount.scheduled) * 100).toFixed(1)}% completion rate
                  </Typography>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Progress
                </Typography>
                <Progress value={(interviewCount.completed / interviewCount.scheduled) * 100} color="green" />
                <Typography color="gray" className="mt-2 font-normal">
                  Keep going! You're making great progress.
                </Typography>
              </CardBody>
            </Card>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >  
            <Card>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Interview Distribution
                </Typography>
                <div className="h-64">
                  <Pie data={chartData} options={chartOptions} />
                </div>
              </CardBody>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Recent Activity
                </Typography>
                {/* Add a list of recent interviews or other relevant information */}
                <Typography color="gray" className="font-normal">
                  Coming soon: Details of your most recent interviews and performance insights.
                </Typography>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;