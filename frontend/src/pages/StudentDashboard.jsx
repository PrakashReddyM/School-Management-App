import React, { useEffect, useState } from 'react';
import { createStudent, deleteStudent, fetchClasses, fetchStudents, updateStudent } from '../utils/api';

const StudentDashboard = ({ user }) => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [studentForm, setStudentForm] = useState({
    name: '',
    gender: '',
    dob: '',
    contactDetails: '',
    class: '',
    feesPaid: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await fetchStudents();
        setStudents(studentsResponse.data || []);
        const classesResponse = await fetchClasses();
        setClasses(classesResponse.data || []);
      } catch (error) {
        console.log('Error Fetching Data:', error);
      }
    };
    fetchData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudentForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, gender, dob, contactDetails, class: classId, feesPaid } = studentForm;

    try {
      let newStudent;
      const studentData = {
        name,
        gender,
        dob: new Date(dob), // Ensure dob is a Date object
        contactDetails,
        class: classId,
        feesPaid,
      };

      if (isEditing) {
        await updateStudent(editStudentId, studentData);
        newStudent = { ...studentForm, _id: editStudentId };
      } else {
        const response = await createStudent(studentData);
        newStudent = response.data;
      }

      setStudents((prevStudents) => {
        // Ensure prevStudents is treated as an array
        return isEditing
          ? prevStudents.map((stu) => (stu._id === editStudentId ? newStudent : stu))
          : [...prevStudents, newStudent]
      });

      // Reset the form after submission
      setStudentForm({
        name: '',
        gender: '',
        dob: '',
        contactDetails: '',
        class: '',
        feesPaid: false,
      });
      setIsEditing(false);
      setEditStudentId(null);
    } catch (error) {
      console.log('Error submitting form:', error.response.data);
    }
  };

  // Edit student handler
  const handleEdit = (studentData) => {
    setIsEditing(true);
    setEditStudentId(studentData._id);
    setStudentForm({
      name: studentData.name,
      gender: studentData.gender,
      dob: studentData.dob.split('T')[0], // Format the date correctly for input
      contactDetails: studentData.contactDetails,
      class: studentData.class ? studentData.class._id : '',
      feesPaid: studentData.feesPaid,
    });
  };

  // Delete student handler
  const handleDelete = async (id) => {
    await deleteStudent(id);
    setStudents((prevStu) => prevStu.filter(stu => stu._id !== id));
  };

  return (
    <div className='ml-48'>
      <p className="text-md bg-blue-500 w-48 flex align-middle rounded py-1 justify-center text-white font-bold mb-4">Students Management</p>
      <div className="flex flex-row">
        {/* Student Table */}
        <div style={{ width: '65%' }} className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-green-300 shadow-xl">Name</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-green-300 shadow-xl">Gender</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-green-300 shadow-xl">DOB</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-green-300 shadow-xl">Contact</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-green-300 shadow-xl">Class</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-green-300 shadow-xl">Fees Paid</th>
                <th style={{ fontFamily: 'monospace' }} className="py-2 px-4 bg-green-300 shadow-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((studentData) => (
                  <tr key={studentData._id} className="hover:bg-gray-100">
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{studentData.name}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{studentData.gender}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{new Date(studentData.dob).toLocaleDateString()}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{studentData.contactDetails}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{studentData.class ? studentData.class.name : 'N/A'}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">{studentData.feesPaid ? 'Yes' : 'No'}</td>
                    <td style={{ fontFamily: 'monospace' }} className="py-2 px-4  shadow-xl rounded-xl">
                      <button onClick={() => handleEdit(studentData)} className="bg-orange-400 text-white px-3 py-1 rounded">Edit</button>
                      <button onClick={() => handleDelete(studentData._id)} className="bg-blue-500 text-white px-3 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No Students Enrolled</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* Student Form */}
        {user.role === 'admin' ?
          <>
            <div className="bg-white h-96 flex flex-col justify-center shadow-md rounded-lg p-6 mb-6 max-w-xs mx-auto border">
              <h2 className="text-sm bg-green-400 w-10 text-white rounded flex align-middle justify-center font-semibold mb-4">
                {isEditing ? 'EDIT' : 'ADD'}
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="flex mb-2">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full p-1 border rounded-md"
                    value={studentForm.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex mb-2">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    required
                    className="w-full p-1 border rounded-md"
                    value={studentForm.gender}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex mb-2">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">DOB</label>
                  <input
                    type="date"
                    name="dob"
                    required
                    className="w-full p-1 border rounded-md"
                    value={studentForm.dob}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex mb-2">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Contact Details</label>
                  <input
                    type="text"
                    name="contactDetails"
                    required
                    className="w-full p-1 border rounded-md"
                    value={studentForm.contactDetails}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex mb-2">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Class</label>
                  <select
                    name="class"
                    required
                    className="w-full p-1 border rounded-md"
                    value={studentForm.class}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Class</option>
                    {classes.map((clas) => (
                      <option key={clas._id} value={clas._id}>{clas.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex mb-2">
                  <label className="text-gray-700 mb-2 w-28 font-extrabold text-sm">Fees Paid</label>
                  <input
                    type="checkbox"
                    name="feesPaid"
                    className="w-5 h-5"
                    checked={studentForm.feesPaid}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{isEditing ? 'Update' : 'Add'} Student</button>
              </form>
            </div>
          </> : <></>}
      </div>
    </div>
  );
};

export default StudentDashboard;
