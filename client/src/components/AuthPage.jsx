import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [profilePic, setProfilePic] = useState(null); // State to store the selected file
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Check if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home'); // Redirect to home if already logged in
        }
    }, [navigate]);

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                email,
                password,
            });

            // Store token, role, and user in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.user.role);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/home'); // Redirect to home after login
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    // Handle signup
    const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);
        if (profilePic) {
            formData.append('profilePic', profilePic); // Add profile picture file
        }

        try {
            const response = await axios.post('http://localhost:5000/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // On successful signup, automatically log in the user
            const loginResponse = await axios.post('http://localhost:5000/auth/login', {
                email,
                password,
            });

            // Store token, role, and user in localStorage
            localStorage.setItem('token', loginResponse.data.token);
            localStorage.setItem('role', loginResponse.data.user.role);
            localStorage.setItem('user', JSON.stringify(loginResponse.data.user));

            navigate('/home'); // Redirect to home after signup
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <div>
            <h2>{isSignup ? 'Signup' : 'Login'}</h2>
            <form onSubmit={isSignup ? handleSignup : handleLogin}>
                {isSignup && (
                    <>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {/* Profile picture upload */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                        />
                    </>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {isSignup && (
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                )}
                {error && <p>{error}</p>}
                <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
            </form>
            <button onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
            </button>
        </div>
    );
};

export default AuthPage;








// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AuthPage = () => {
//     const [isSignup, setIsSignup] = useState(false);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('customer');
//     const [profilePic, setProfilePic] = useState(null); // State to store the selected file
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     // Handle login
//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5000/auth/login', {
//                 email,
//                 password,
//             });

//             // Store token, role, and user in localStorage
//             localStorage.setItem('token', response.data.token);
//             localStorage.setItem('role', response.data.user.role);
//             localStorage.setItem('user', JSON.stringify(response.data.user));

//             navigate('/home'); // Redirect to home after login
//         } catch (err) {
//             setError(err.response?.data?.error || 'Login failed');
//         }
//     };

//     // Handle signup
//     const handleSignup = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('email', email);
//         formData.append('password', password);
//         formData.append('role', role);
//         if (profilePic) {
//             formData.append('profilePic', profilePic); // Add profile picture file
//         }

//         try {
//             const response = await axios.post('http://localhost:5000/auth/signup', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             // On successful signup, automatically log in the user
//             const loginResponse = await axios.post('http://localhost:5000/auth/login', {
//                 email,
//                 password,
//             });

//             // Store token, role, and user in localStorage
//             localStorage.setItem('token', loginResponse.data.token);
//             localStorage.setItem('role', loginResponse.data.user.role);
//             localStorage.setItem('user', JSON.stringify(loginResponse.data.user));

//             navigate('/home'); // Redirect to home after signup
//         } catch (err) {
//             setError(err.response?.data?.error || 'Signup failed');
//         }
//     };

//     return (
//         <div>
//             <h2>{isSignup ? 'Signup' : 'Login'}</h2>
//             <form onSubmit={isSignup ? handleSignup : handleLogin}>
//                 {isSignup && (
//                     <>
//                         <input
//                             type="text"
//                             placeholder="Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />
//                         {/* Profile picture upload */}
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => setProfilePic(e.target.files[0])}
//                         />
//                     </>
//                 )}
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 {isSignup && (
//                     <select value={role} onChange={(e) => setRole(e.target.value)}>
//                         <option value="customer">Customer</option>
//                         <option value="admin">Admin</option>
//                     </select>
//                 )}
//                 {error && <p>{error}</p>}
//                 <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
//             </form>
//             <button onClick={() => setIsSignup(!isSignup)}>
//                 {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
//             </button>
//         </div>
//     );
// };

// export default AuthPage;
