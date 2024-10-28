import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProcessControl = () => {
    const [sessionName, setSessionName] = useState('');
    const [program, setProgram] = useState('');
    const [activeProcesses, setActiveProcesses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchActiveProcesses(); // Fetch active processes on component mount
    }, []);

    const fetchActiveProcesses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/process/sessions'); // Fetch active sessions
            console.log('Fetched active processes:', response.data); // Log the fetched data
            if (response.data.success) {
                setActiveProcesses(response.data.sessions); // Adjust based on your response structure
            } else {
                console.error('Failed to fetch active processes:', response.data);
            }
        } catch (error) {
            console.error('Error fetching active processes:', error);
        }
    };

    const handleStartProcess = async (e) => {
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
            fetchActiveProcesses(); // Refresh the active processes list
        } catch (error) {
            console.error('Error starting process:', error.response ? error.response.data : error);
            setError('Failed to start process. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleStopProcess = async (session) => {
        try {
            await axios.post('http://localhost:5000/api/process/stop', {
                sessionName: session,
            });
            fetchActiveProcesses(); // Refresh the active processes list
        } catch (error) {
            console.error('Error stopping process:', error);
        }
    };

    return (
        <div>
            <h3>Process Control</h3>
            <form onSubmit={handleStartProcess}>
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Starting...' : 'Start Process'}
                </button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h4>Active Processes</h4>
            <ul>
                {activeProcesses.map((process) => (
                    <li key={process.sessionName}>
                        {process.sessionName} (PID: {process.pid}, Name: {process.name})
                        <button onClick={() => handleStopProcess(process.sessionName)}>Stop</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProcessControl;
