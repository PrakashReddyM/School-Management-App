import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required elements for ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsDashboard = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get('/api/students');

        setStudentsData(studentsResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const maleCount = studentsData?.filter((student) => student.gender === 'Male').length || 0;
  const femaleCount = studentsData?.filter((student) => student.gender === 'Female').length || 0;

  const genderDistribution = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Student Gender Distribution',
        data: [maleCount, femaleCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-48 p-6 mt-10 flex justify-start">
      <div className="mb-20">
      <p className="text-md bg-blue-800 w-56 flex align-middle rounded py-1 justify-center text-white font-bold mb-4">Student Gender Distribution</p>
        <div className="flex h-60 justify-start">
          <Pie data={genderDistribution} />
        </div>
      </div>

    </div>
  );
};

export default AnalyticsDashboard;

