import React, { useEffect, useState } from 'react';
import { FaUsers, FaUserTie, FaCalendarCheck } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { getDashboardDetails } from '../../api/adminApi';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IDashboardDetails {
  candidatesCount: number;
  interviewersCount: number;
  interviewsCount: {
    completed: number;
    scheduled: number;
  };
}

interface IInterview {
  _id: string;
  date: string;
  fromTime: string;
  toTime: string;
  description: string;
  title: string;
  price: number;
  interviewerId: string;
  candidateId: string;
  status: string;
  roomId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  interviewerRatingAdded: boolean;
}

const aggregateChartData = (interviews: IInterview[], groupBy: 'month' | 'day') => {
  const data: { [key: string]: { interviews: number; revenue: number } } = {};

  interviews.forEach((interview) => {
    const date = new Date(interview.date);
    let key: string;

    if (groupBy === 'month') {
      key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    } else {
      key = new Date(date).toLocaleDateString('en-IN', {day: '2-digit', month: 'long'}); // YYYY-MM-DD format
    }

    if (!data[key]) {
      data[key] = { interviews: 0, revenue: 0 };
    }

    data[key].interviews += 1;
    data[key].revenue += interview.price;
  });

  const sortedKeys = Object.keys(data).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  return {
    labels: sortedKeys,
    interviewsData: sortedKeys.map(key => data[key].interviews),
    revenueData: sortedKeys.map(key => data[key].revenue)
  };
};

const AdminDashboard = () => {
  const [dashboardDetails, setDashboardDetails] = useState<IDashboardDetails>({
    candidatesCount: 0,
    interviewsCount: { completed: 0, scheduled: 0 },
    interviewersCount: 0,
  });

  const [interviews, setInterviews] = useState<IInterview[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'month' | 'day'>('month');

  const chartOptions:ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance Chart',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: viewMode === 'month' ? 'Month' : 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count / Revenue (₹)',
        },
      },
    },
  };

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      const response = await getDashboardDetails();
      const {candidatesCount, interviewsCount, interviewersCount} = response.data;
      setDashboardDetails({candidatesCount, interviewersCount, interviewsCount});
      setInterviews(response.data.scheduledInterviews);
    };
    fetchDashboardDetails();
  }, []);

  useEffect(() => {
    if (interviews.length > 0) {
      const { labels, interviewsData, revenueData } = aggregateChartData(interviews, viewMode);
      setChartData({
        labels,
        datasets: [
          {
            label: 'Interviews',
            data: interviewsData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Revenue (₹)',
            data: revenueData,
            backgroundColor: 'rgba(53, 162, 235, 0.6)',
            borderColor: 'rgba(53, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [interviews, viewMode]);

  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'month' ? 'day' : 'month');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF5FF] to-[#D9E9FF] p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#19328F]">Admin Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<FaUserTie className="text-[#2F76FF]" />} title="Interviewers" value={dashboardDetails.interviewersCount} />
        <StatCard icon={<FaUsers className="text-[#2F76FF]" />} title="Candidates" value={dashboardDetails.candidatesCount} />
        <StatCard icon={<FaCalendarCheck className="text-[#2F76FF]" />} title="Total Interviews" value={dashboardDetails.interviewsCount.completed + dashboardDetails.interviewsCount.scheduled} />
        <StatCard icon={<FaCalendarCheck className="text-green-500" />} title="Scheduled Interviews" value={dashboardDetails.interviewsCount.scheduled} />
      </div>

      <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Performance Chart</h2>
          <button
            onClick={toggleViewMode}
            className="bg-[#19328F] text-white px-4 py-2 rounded"
          >
            {viewMode === 'month' ? 'Switch to Daily View' : 'Switch to Monthly View'}
          </button>
        </div>
        {chartData && <Bar options={chartOptions} data={chartData} />}
      </div>
    </div>
  );
};

interface IStatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number
}

const StatCard: React.FC<IStatCardProps> = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300">
    <div className="text-4xl">{icon}</div>
    <div>
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-[#19328F]">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;