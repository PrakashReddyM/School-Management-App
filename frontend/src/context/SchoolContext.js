import React, { createContext, useState, useContext } from 'react';

const SchoolContext = createContext();

export const SchoolProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [userRole, setUserRole] = useState('admin'); // 'admin', 'teacher', 'student'

  return (
    <SchoolContext.Provider value={{ students, setStudents, teachers, setTeachers, classes, setClasses, userRole, setUserRole }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => {
  return useContext(SchoolContext);
};
