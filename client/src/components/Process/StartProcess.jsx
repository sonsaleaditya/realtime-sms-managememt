import React, { useState } from 'react';
import axios from 'axios';

const StartProcess = () => {
    const [sessionName, setSessionName] = useState('');
    const [program, setProgram] = useState('');
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
            console.log('Starting process with:', { sessionName, program }); // Log data
            const response = await axios.post('http://localhost:5000/api/process/start', {
                sessionName,
                program,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token
                    'Content-Type': 'application/json',
                }
            });

            setMessage('Process started successfully!'); 
            console.log('Process started:', response.data); 
        } catch (error) {
            console.error('Error starting process:', error.response ? error.response.data : error);
            setError('Failed to start process. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Start Process</h3>
            <div>
                <label>Session Name:</label>
                <input 
                    type="text" 
                    value={sessionName} 
                    onChange={(e) => setSessionName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Program:</label>
                <input 
                    type="text" 
                    value={program} 
                    onChange={(e) => setProgram(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" disabled={loading}>{loading ? 'Starting...' : 'Start'}</button>
            {message && <p style={{ color: 'green' }}>{message}</p>} {/* Show success message */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
        </form>
    );
};

export default StartProcess;
