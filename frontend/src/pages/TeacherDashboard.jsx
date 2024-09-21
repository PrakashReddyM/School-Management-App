import React, { useEffect, useState } from 'react';
import { fetchTeachers, createTeacher, updateTeacher, deleteTeacher, fetchClasses } from '../utils/api';

const TeacherDashboard = ({ user }) => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]); // To show available classes
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    gender: '',
    dob: '',
    contactDetails: '',
    salary: '',
    classAssigned: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editTeacherId, setEditTeacherId] = useState(null);

  // Fetch teachers and classes on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachersResponse = await fetchTeachers();
        setTeachers(teachersResponse.data || []);

        const classesResponse = await fetchClasses();
        setClasses(classesResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherForm({ ...teacherForm, [name]: value });
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, gender, dob, contactDetails, salary, classAssigned } = teacherForm;

    try {
      let newTeacher;
      if (isEditing) {
        await updateTeacher(editTeacherId, { name, gender, dob, contactDetails, salary, classAssigned });
        newTeacher = { ...teacherForm, _id: editTeacherId };
      } else {
        const response = await createTeacher({ name, gender, dob, contactDetails, salary, classAssigned });
        newTeacher = response.data;
      }

      setTeachers((prevTeachers) =>
        isEditing
          ? prevTeachers.map(teacher => (teacher._id === editTeacherId ? newTeacher : teacher))
          : [...prevTeachers, newTeacher]
      );

      setTeacherForm({ name: '', gender: '', dob: '', contactDetails: '', salary: '', classAssigned: '' });
      setIsEditing(false);
      setEditTeacherId(null);
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  // Handle edit
  const handleEdit = (teacherData) => {
    setIsEditing(true);
    setTeacherForm({
      name: teacherData.name,
      gender: teacherData.gender,
      dob: teacherData.dob.split('T')[0], // Format for input date type
      contactDetails: teacherData.contactDetails,
      salary: teacherData.salary,
      classAssigned: teacherData.classAssigned || ''
    });
    setEditTeacherId(teacherData._id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    await deleteTeacher(id);
    setTeachers((prevTeachers) => prevTeachers.filter(teacher => teacher._id !== id));
  };

  return (
    <div className='ml-48'>
      <p className="text-md bg-blue-500 w-48 flex align-middle rounded py-1 justify-center text-white font-bold mb-4">Teachers Management</p>
      <div className="flex flex-row">
        {/* Teacher Table */}
        <div style={{ width: '68%' }} className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-lime-200 shadow-xl">Name</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-lime-200 shadow-xl">Gender</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-lime-200 shadow-xl">Date of Birth</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-lime-200 shadow-xl">Contact</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-lime-200 shadow-xl">Salary</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-lime-200 shadow-xl">Class Assigned</th>
                {user.role == 'admin' ? <>
                  <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-lime-200 shadow-xl">Actions</th>
                </> : <></>}
              </tr>
            </thead>
            <tbody>
              {teachers.length > 0 ? (
                teachers.map((teacherData) => (
                  <tr key={teacherData._id} className="hover:bg-gray-100">
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{teacherData.name}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{teacherData.gender}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{new Date(teacherData.dob).toLocaleDateString()}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{teacherData.contactDetails}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{teacherData.salary}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{teacherData.classAssigned ? teacherData.classAssigned.name : 'N/A'}</td>
                    {user.role == 'admin' ? <>
                      <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl ">
                        <button onClick={() => handleEdit(teacherData)} className="bg-orange-400 text-white px-3 mb-1 py-1 rounded">Edit</button>
                        <button onClick={() => handleDelete(teacherData._id)} className="bg-blue-500 text-white px-3 py-1 rounded">Delete</button>
                      </td>
                    </> : <></>}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No teachers available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Teacher Form */}
        {user.role === 'admin' ?
          <>
            <div className="bg-white h-96 flex flex-col justify-center shadow-md rounded-lg p-6 mb-6 w-64 mx-auto border">
              <h2 className="text-sm bg-green-400 w-10 text-white rounded flex align-middle justify-center font-semibold mb-4">
                {isEditing ? 'EDIT' : 'ADD'}
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="flex mb-4">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full p-1 border rounded-md"
                    value={teacherForm.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex mb-4">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Gender</label>
                  <select
                    name="gender"
                    required
                    className="w-full p-1 border rounded-md"
                    value={teacherForm.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex mb-4">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">DOB</label>
                  <input
                    type="date"
                    name="dob"
                    required
                    className="w-full p-1 border rounded-md"
                    value={teacherForm.dob}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex mb-4">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Contact</label>
                  <input
                    type="text"
                    name="contactDetails"
                    required
                    className="w-full p-1 border rounded-md"
                    value={teacherForm.contactDetails}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex mb-4">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Salary</label>
                  <input
                    type="number"
                    name="salary"
                    required
                    className="w-full p-1 border rounded-md"
                    value={teacherForm.salary}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex mb-4">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Class</label>
                  <select
                    name="classAssigned"
                    className="w-full p-1 border rounded-md"
                    value={teacherForm.classAssigned}
                    onChange={handleInputChange}
                  >
                    <option value="">Assign a Class</option>
                    {classes.map((classData) => (
                      <option key={classData._id} value={classData._id}>{classData.name}</option>
                    ))}
                  </select>
                </div>
                <button className="bg-green-400 w-20 flex align-middle justify-center text-white py-1 rounded font-bold">
                  {isEditing ? 'Update' : 'Add'}
                </button>
              </form>
            </div>
          </> : <></>}
      </div>
    </div>
  );
};

export default TeacherDashboard;
