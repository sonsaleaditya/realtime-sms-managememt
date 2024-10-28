import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Ensure this file exists for styling

const Dashboard = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        navigate('/signin'); // Redirect to the sign-in page
    };

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Welcome to Dynamic SMS Management</h2>
            <p className="welcome-text">Your one-stop solution for managing SMS operations seamlessly!</p>
            <p className="best-text">Empowering communication at your fingertips.</p>
            <button onClick={handleSignOut} className="signout-button">
                Sign Out
            </button>

            {/* Navigation Buttons */}
            <div className="management-buttons">
                <button onClick={() => navigateTo('/country-operators')} className="management-button">
                    Manage Country Operators
                </button>
                <button onClick={() => navigateTo('/send-sms')} className="management-button">
                    Send SMS
                </button>
                <button onClick={() => navigateTo('/process-control')} className="management-button">
                   control Processes
                </button>

                 <button onClick={() => navigateTo('/sms-metrics')} className="management-button">
                    View SMS Metrics
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
