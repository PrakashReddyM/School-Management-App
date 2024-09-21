import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bus from '../assests/maple.png'

const Profile = ({ user,setShowLogin,setUser }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('https://school-management-app-back.onrender.com/api/auth/logout', { withCredentials: true });
            localStorage.removeItem('token');
            setUser(null);
            setShowLogin(true);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return (
        <div className="ml-48 flex justify-start align-top  h-screen ">
            <div className="w-full">
                {user ? (
                    <div className='relative flex flex-row w-full'>
                        <div className="bg-gradient-to-r from-red-200 to-purple-300 h-56 w-96 shadow-lg rounded-lg p-6">
                        <h2 style={{ fontFamily: 'fantasy' }} className="text-start text-gray-800 mb-2">Name : {user.name}</h2>
                        <p style={{ fontFamily: 'fantasy' }} className="text-start text-gray-800  mb-2">Email : {user.email}</p>
                        <p style={{ fontFamily: 'fantasy' }} className="text-start text-gray-800  mb-2">Role : {user.role}</p>
                        <div className="flex justify-between mt-4">
                            <Link to={'/login'}>
                                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Logout
                                </button>
                            </Link>
                        </div>
                        <div className='absolute right-10 w-96'>
                            <img src={bus} alt="" />
                        </div>
                    </div>
                    </div>
                ) : (
                    <p className="text-gray-700 text-center">Loading profile...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
