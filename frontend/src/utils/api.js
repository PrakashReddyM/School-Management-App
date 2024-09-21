import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'



//Classes
export const fetchClasses = () => axios.get(`${API_BASE_URL}/classes`);
export const createClass = (classData) => axios.post(`${API_BASE_URL}/classes`, classData)
export const updateClass = (id, classData) => axios.put(`${API_BASE_URL}/classes/${id}`, classData)
export const deleteClass = (id) => axios.delete(`${API_BASE_URL}/classes/${id}`)

//Teachers
export const fetchTeachers = () => axios.get(`${API_BASE_URL}/teachers`)
export const createTeacher = (teacherData) => axios.post(`${API_BASE_URL}/teachers`, teacherData)
export const updateTeacher = (id, teacherData) => axios.put(`${API_BASE_URL}/teachers/${id}`, teacherData)
export const deleteTeacher = (id) => axios.delete(`${API_BASE_URL}/teachers/${id}`)

//Students
export const fetchStudents = () => axios.get(`${API_BASE_URL}/students`);
export const createStudent = (studentData) => axios.post(`${API_BASE_URL}/students`, studentData);
export const updateStudent = (id, studentData) => axios.put(`${API_BASE_URL}/students/${id}`, studentData);
export const deleteStudent = (id) => axios.delete(`${API_BASE_URL}/students/${id}`);

