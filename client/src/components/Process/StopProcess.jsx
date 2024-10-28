import React, { useState } from 'react';
import axios from 'axios';

const StopProcess = () => {
    const [sessionName, setSessionName] = useState('');
    const [message, setMessage] = useState(''); // State for feedback messages
    const [error, setError] = useState(''); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading indicator

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); 
        setError('');
        setLoading(true); // Set loading to true

        // Retrieve the token from local storage
        const token = localStorage.getItem('token'); 

        try {
            console.log('Stopping process with session name:', sessionName); // Log data
            const response = await axios.post('http://localhost:5000/api/process/stop', {
                sessionName,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token
                    'Content-Type': 'application/json',
                }
            });

            setMessage('Process stopped successfully!'); 
            console.log('Process stopped:', response.data); 
        } catch (error) {
            console.error('Error stopping process:', error.response ? error.response.data : error);
            setError('Failed to stop process. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Stop Process</h3>
            <div>
                <label>Session Name:</label>
                <input 
                    type="text" 
                    value={sessionName} 
                    onChange={(e) => setSessionName(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" disabled={loading}>{loading ? 'Stopping...' : 'Stop'}</button>
            {message && <p style={{ color: 'green' }}>{message}</p>} {/* Show success message */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
        </form>
    );
};

export default StopProcess;
