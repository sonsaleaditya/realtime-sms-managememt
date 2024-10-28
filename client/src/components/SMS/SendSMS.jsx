import React, { useState } from 'react';
import axios from 'axios';

const SendSMS = () => {
    const [smsData, setSmsData] = useState({
        phoneNumber: '',
        message: '',
        country: '',
        operator: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSmsData({ ...smsData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Sending SMS with data:', smsData);
        
        try {
            const token = localStorage.getItem('token'); // Adjust to your method of storing the token
            const response = await axios.post('http://localhost:5000/api/sms/send', smsData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token
                    'Content-Type': 'application/json',
                }
            });
            console.log('Response:', response.data); // Log the response
            alert(response.data.msg); // Alert success message
        } catch (error) {
            console.error('Error occurred:', error);
            if (error.response) {
                alert(`Error: ${error.response.data.msg || 'Unknown error occurred'}`);
            } else if (error.request) {
                alert('Error: No response from server');
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="form">
            <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
            <input type="text" name="message" placeholder="Message" onChange={handleChange} required />
            <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
            <input type="text" name="operator" placeholder="Operator" onChange={handleChange} required />
            <button type="submit">Send SMS</button>
        </form>
    );
};

export default SendSMS;
