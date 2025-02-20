import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const navigate = useNavigate();

    const handleButtonClick = (destination) => {
        navigate(destination);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/auth/logout');
        } catch (error) {
            console.error('Logout failed:', error);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');

        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-4 text-white">
            <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">Welcome to the Home Page</h2>
            <div className="space-y-4 w-full max-w-sm">
                <button 
                    onClick={() => handleButtonClick('/admin-dashboard')} 
                    className="w-full px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition">
                    Admin Dashboard
                </button>
                <button 
                    onClick={() => handleButtonClick('/buyer-dashboard')} 
                    className="w-full px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition">
                    Buyer Dashboard
                </button>
            </div>
            <button 
                onClick={handleLogout} 
                className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition">
                Logout
            </button>
        </div>
    );
};

export default HomePage;
