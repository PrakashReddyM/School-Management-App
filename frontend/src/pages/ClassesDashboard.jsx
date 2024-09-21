import React, { useEffect, useState } from 'react';
import { createClass, deleteClass, fetchClasses, updateClass, fetchTeachers } from '../utils/api';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

const ClassesDashboard = ({ user }) => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classForm, setClassForm] = useState({ name: '', year: '', teacher: '', fees: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editClassId, setEditClassId] = useState(null);

  // Fetch classes and teachers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const classesResponse = await fetchClasses();
        setClasses(classesResponse.data || []);
        const teachersResponse = await fetchTeachers();
        setTeachers(teachersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassForm({ ...classForm, [name]: value });
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, year, teacher, fees } = classForm;
    try {
      let newClass;
      if (isEditing) {
        await updateClass(editClassId, { name, year, teacher, fees });
        newClass = { ...classForm, _id: editClassId };
      } else {
        const response = await createClass({ name, year, teacher, fees });
        newClass = { ...response.data };
      }

      setClasses((prevClasses) =>
        isEditing
          ? prevClasses.map(cls => (cls._id === editClassId ? newClass : cls))
          : [...prevClasses, newClass]
      );

      setClassForm({ name: '', year: '', teacher: '', fees: '' });
      setIsEditing(false);
      setEditClassId(null);
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  // Edit class handler
  const handleEdit = (classData) => {
    setIsEditing(true);
    setClassForm({
      name: classData.name,
      year: classData.year,
      teacher: classData.teacher._id,
      fees: classData.fees,
    });
    setEditClassId(classData._id);
  };

  // Delete class handler
  const handleDelete = async (id) => {
    await deleteClass(id);
    setClasses((prevClasses) => prevClasses.filter(cls => cls._id !== id));
  };

  return (
    <div className='ml-48'>
      <p className="text-md bg-blue-500 w-48 flex align-middle rounded py-1 justify-center text-white font-bold mb-4">Classes Management</p>
      <div className="flex flex-row">
        {/* Class Table */}
        <div style={{ width: '65%' }} className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-rose-400 shadow-xl">Class Name</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-rose-400  shadow-xl ">Year</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-rose-400 shadow-xl ">Teacher</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-rose-400 shadow-xl">Fees</th>
                {user.role == 'admin' ? <>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-rose-400 shadow-xl">Actions</th>
                </> : <></>}
              </tr>
            </thead>
            <tbody>
              {classes.length > 0 ? (
                classes.map((classData) => (
                  <tr key={classData._id} className="hover:bg-gray-100">
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{classData.name}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{classData.year}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{classData.teacher ? classData.teacher.name : 'N/A'}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">${classData.fees}</td>
                    {user.role == 'admin' ? <>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl flex justify-center">
                      <button onClick={() => handleEdit(classData)} className="bg-orange-400 text-white px-3 py-1 mr-4 rounded">Edit</button>
                      <button onClick={() => handleDelete(classData._id)} className="bg-blue-500 text-white px-3 py-1 rounded">Delete</button>
                    </td>
                    </> : <></>}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No classes available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Class Form */}
        {user.role === 'admin' ?
          <>
            <div className="bg-white h-96 flex flex-col justify-center shadow-md rounded-lg p-6 mb-6 max-w-xs mx-auto border">
              <h2 className="text-sm bg-green-400 w-10 text-white rounded flex align-middle justify-center font-semibold mb-4">
                {isEditing ? 'EDIT' : 'ADD'}
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="flex mb-4">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Class Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full p-1 border rounded-md"
                    value={classForm.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex mb-4">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Year</label>
                  <input
                    type="number"
                    name="year"
                    required
                    className="w-full p-1 border rounded-md"
                    value={classForm.year}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex mb-4">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Teacher</label>
                  <select
                    name="teacher"
                    required
                    className="w-full p-1 border rounded-md"
                    value={classForm.teacher}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex mb-4">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Fees</label>
                  <input
                    type="number"
                    name="fees"
                    required
                    className="w-full p-1 border rounded-md"
                    value={classForm.fees}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  {isEditing ? 'Update Class' : 'Add Class'}
                </button>
              </form>
            </div>
          </> : <>
          
          </>}
      </div>
      <AnalyticsDashboard />
    </div>
  );
};

export default ClassesDashboard;
