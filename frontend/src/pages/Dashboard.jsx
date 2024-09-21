import React, { useEffect, useState } from 'react';
import {fetchClasses, fetchStudents, fetchTeachers} from '../utils/api'
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import img1 from '../assests/w1.jpg'

const Dashboard = () => {
  const [classCount,setClassCount] = useState(0)
  const [teacherCount,setTeacherCount] = useState(0)
  const [studentCount,setStudentCount] = useState(0)

  useEffect(()=>{
    const getData = async()=>{
      try {
        const classData = await fetchClasses()
        setClassCount(classData.data.length)

        const teacherData = await fetchTeachers()
        setTeacherCount(teacherData.data.length)

        const studentData = await fetchStudents()
        setStudentCount(studentData.data.length)
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }
    getData()
  },[])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 ml-48 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1  className="text-md bg-blue-800 w-48 flex align-middle rounded py-1 justify-center text-white font-bold mb-4">Dashboard Overview</h1>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-rose-500 text-white shadow-md p-4 rounded-3xl">
            <p className="mt-4 text-3xl font-bold">{classCount}+</p>
            <h2 style={{fontFamily:'fantasy'}} className="text-xl">COURSES AVAILABLE</h2>
          </div>

          <div className="bg-indigo-600 text-white shadow-md p-6 rounded-3xl">
            <p className="mt-4 text-3xl font-bold">{teacherCount}+</p>
            <h2  style={{fontFamily:'fantasy'}} className="text-xl">TOP TEACHERS</h2>
          </div>

          <div className="bg-cyan-700 text-white shadow-md p-4 rounded-3xl">
            <p className="mt-4 text-3xl font-bold">{studentCount}+</p>
            <h2  style={{fontFamily:'fantasy'}} className="text-xl ">STUDENTS ENROLLED</h2>
          </div>
        </div>

      </div>
      <div className='flex flex-row'>
      <AnalyticsDashboard className="ml-48"/>
      <img  src={img1} alt="img" />
      </div>
    </div>
  );
};

export default Dashboard;
