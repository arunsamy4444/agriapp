import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage'; 
import AdminDashboard from './components/AdminDashboard'; 
import BuyerDashboard from './components/BuyerDashboard'; 
import Payment from './components/Payment';
import MapComponent from './components/MapComponent';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route for the AuthPage (Login/Signup) */}
                <Route path="/" element={<AuthPage />} />

                {/* Route for Home Page with buttons */}
                <Route path="/home" element={<HomePage />} />

                {/* Routes for each database page */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                
                <Route path="/payment/:userId/:orderId" element={<Payment />} />
                
                {/* Route for MapComponent */}
                <Route path="/map" element={<MapComponent />} />
            </Routes>
        </Router>
    );
};

export default App;




// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AuthPage from './components/AuthPage';
// import HomePage from './components/HomePage'; 
// import AdminDashboard from './components/AdminDashboard'; 
// import BuyerDashboard from './components/BuyerDashboard'; 
// import Payment from './components/Payment';
// import './App.css'
// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 {/* Route for the AuthPage (Login/Signup) */}
//                 <Route path="/" element={<AuthPage />} />

//                 {/* Route for Home Page with buttons */}
//                 <Route path="/home" element={<HomePage />} />

//                 {/* Routes for each database page */}
//                 <Route path="/admin-dashboard" element={<AdminDashboard />} />
//                 <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                
//                 <Route path="/payment/:userId/:orderId" element={<Payment />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;
