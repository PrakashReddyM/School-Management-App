import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SchoolProvider } from './context/SchoolContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ClassPage from './pages/ClassesDashboard';
import TeacherPage from './pages/TeacherDashboard';
import StudentPage from './pages/StudentDashboard';
import Auth from './pages/Auth';
import Profile from './components/Profile';

const App = () => {
  const [showLogin,setShowLogin] = useState(true)
  const [user,setUser] = useState(null)
  return (
    <SchoolProvider>
      <Router>
        <div className="flex overflow-hidden">
          {showLogin ? <Auth setUser={setUser} setShowLogin={setShowLogin} /> : <>
          <Sidebar />
          <div className="flex-1 p-4">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/classes" element={<ClassPage user={user}/>} />
              <Route path="/profile" element={<Profile user={user} setShowLogin={setShowLogin} setUser={setUser}/>}/>
              <Route path="/teachers" element={<TeacherPage user={user}/>} />
              <Route path="/students" element={<StudentPage user={user}/>} />
            </Routes>
          </div>
          </>}
        </div>
      </Router>
    </SchoolProvider>
  );
};

export default App;
