import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const navigate = useNavigate();

    const handleButtonClick = (destination) => {
        navigate(destination);  // Navigate to the appropriate route when the button is clicked
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/auth/logout'); // Server-side logout (optional)
        } catch (error) {
            console.error('Logout failed:', error);
        }

        // Remove token and user details from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');

        navigate('/'); // Redirect to login page
    };

    return (
        <div>
            <h2>Welcome to the Home Page</h2>
            <div>
                <button onClick={() => handleButtonClick('/admin-dashboard')}>Admin Dashboard</button>
             
                <button onClick={() => handleButtonClick('/buyer-dashboard')}>Buyer Dashboard</button>
            </div>
            <button onClick={handleLogout} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}>
                Logout
            </button>
        </div>
    );
};

export default HomePage;
