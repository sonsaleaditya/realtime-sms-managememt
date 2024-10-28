import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RealTimeMetrics = () => {
    const [metrics, setMetrics] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const token = localStorage.getItem('token'); // Ensure you have stored the token
                console.log('Token:', token); // Check the token in console
        
                const response = await axios.get('http://localhost:5000/api/sms-metrics/fetch-sms-metrics', {
                    headers: {
                        Authorization: `Bearer ${token}` // Send the token in the Authorization header
                    }
                });
        
                console.log('Fetched Metrics:', response.data);
                if (response.data.success) {
                    setMetrics(response.data.metrics);
                } else {
                    setError('Failed to fetch metrics');
                }
            } catch (error) {
                console.error('Error fetching metrics:', error.response ? error.response.data : error);
                setError('Error fetching metrics');
            }
        };
        
        fetchMetrics();
        const interval = setInterval(fetchMetrics, 5000); 
        return () => clearInterval(interval); 
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h3>Real-Time Metrics</h3>
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Operator</th>
                        <th>Date</th>
                        <th>SMS Sent</th>
                        <th>Success Rates</th>
                        <th>Errors</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.length === 0 ? (
                        <tr>
                            <td colSpan="6">No metrics available.</td>
                        </tr>
                    ) : (
                        metrics.map((metric) => (
                            <tr key={metric.id}>
                                <td>{metric.country}</td>
                                <td>{metric.operator}</td>
                                <td>{new Date(metric.date).toLocaleString()}</td>
                                <td>{metric.sms_sent}</td>
                                <td>{(metric.success_rates * 100).toFixed(2)}%</td>
                                <td>{metric.errors}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RealTimeMetrics;
