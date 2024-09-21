import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Auth = ({ setShowLogin,setUser }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()


    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const { data } = await axios.post('http://localhost:8000/api/auth/login', { email, password });
                setUser(data.user)
                if (data.success) {
                    localStorage.setItem('token', data.token);
                }
            } else {
                const { data } = await axios.post('http://localhost:8000/api/auth/register', { name, email, password, role });
                setUser(data.user)
                if (data.success) {
                    localStorage.setItem('token', data.token);
                }
            }
            setShowLogin(false);
            navigate('/');
        } catch (err) {
            console.log(err.response?.data?.message || 'Something went wrong');
        }
    };
    return (
        <div className='flex justify-center w-full items-center h-screen'>
            <div className='w-full max-w-xs'>
                <div className='bg-white shadow-md rounded p-8 pt-6 mb-4'>
                    {isLogin ? (
                        <>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    className='shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder='Password'
                                    required
                                    className='shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className='bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline'
                                    type='submit'
                                >Login</button>
                            </form>
                            <p className='text-center mt-4'>OR</p>
                            <button
                                className='text-blue-500 hover:text-blue-700 font-bold w-full'
                                type='button'
                                onClick={() => setIsLogin(false)}
                            >Register Instead</button>
                        </>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <input
                                    type="name"
                                    placeholder='Name'
                                    required
                                    className='shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    className='shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder='Password'
                                    required
                                    className='shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder='Role'
                                    required
                                    className='shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <p>options: admin ,teacher ,student</p>
                                <button
                                    className='bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline'
                                    type='submit'
                                >Register</button>
                            </form>
                            <p className='text-center mt-4'>OR</p>
                            <button
                                className='text-blue-500 hover:text-blue-700 font-bold w-full'
                                onClick={() => setIsLogin(true)}
                            >Login Instead</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Auth