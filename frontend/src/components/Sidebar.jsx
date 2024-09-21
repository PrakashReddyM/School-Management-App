import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const maleProfile = `https://avatar.iran.liara.run/public/boy`
  return (
    <div className="w-48 fixed bg-blue-800 h-full text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">School CRM</h1>
      </div>
      <nav className="mt-10">
        <Link to="/profile" className="block w-32 m-auto p-4 my-2">
          <img src={maleProfile} alt="img" />
        </Link>
        <Link to="/" className="flex bg-white rounded-l-xl ml-4 my-2 text-black font-mono justify-end px-6 py-4 hover:text-white hover:bg-gray-800">
          Dashboard
        </Link>
        <Link to="/classes" className="flex bg-white rounded-l-xl ml-4 my-2 text-black font-mono justify-end px-6 py-4 hover:text-white hover:bg-gray-800">
          Classes
        </Link>
        <Link to="/teachers" className="flex bg-white rounded-l-xl ml-4 my-2 text-black font-mono justify-end px-6 py-4 hover:text-white hover:bg-gray-800">
          Teachers
        </Link>
        <Link to="/students" className="flex bg-white rounded-l-xl ml-4 my-2 text-black font-mono justify-end px-6 py-4 hover:text-white hover:bg-gray-800">
          Students
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

