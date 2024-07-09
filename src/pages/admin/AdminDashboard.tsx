import React from 'react';
import { FaUsers, FaUserTie, FaCalendarCheck, FaCalendarTimes, FaMoneyBillWave } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  // Sample data - replace with real data from your API
  const stats = {
    interviewers: 150,
    candidates: 1200,
    totalInterviews: 3000,
    scheduledInterviews: 500,
    cancelledInterviews: 50,
    revenue: 50000
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Interviews',
        data: [300, 450, 600, 470, 520, 660],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Revenue ($)',
        data: [5000, 6000, 8000, 7500, 8500, 9500],
        backgroundColor: 'rgba(0, 0, 255, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Performance',
      },
    },
  };

  return (
   //  <div className="min-h-screen bg-gradient-to-br from-[#D9E9FF] to-[#EEF5FF] p-8">
    <div className="min-h-screen bg-gradient-to-br from-[#EEF5FF] to-[#D9E9FF] p-8">
      <h1 className="text-4xl font-bold text-[#19328F] mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
         
        <StatCard icon={<FaUserTie className="text-[#2F76FF]" />} title="Interviewers" value={stats.interviewers} />
        <StatCard icon={<FaUsers className="text-[#2F76FF]" />} title="Candidates" value={stats.candidates} />
        <StatCard icon={<FaCalendarCheck className="text-[#2F76FF]" />} title="Total Interviews" value={stats.totalInterviews} />
        <StatCard icon={<FaCalendarCheck className="text-green-500" />} title="Scheduled Interviews" value={stats.scheduledInterviews} />
        <StatCard icon={<FaCalendarTimes className="text-red-500" />} title="Cancelled Interviews" value={stats.cancelledInterviews} />
        <StatCard icon={<FaMoneyBillWave className="text-green-600" />} title="Revenue" value={`$${stats.revenue}`} />
      </div>

      <div className="bg-white rounded-lg shadow-xl p-6">
        <Bar options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300">
    <div className="text-4xl">{icon}</div>
    <div>
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-[#19328F]">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;