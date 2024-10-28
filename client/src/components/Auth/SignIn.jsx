import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/sign-in', {
                username,
                password,
            });
            console.log('Login successful:', response.data);

            // Assuming the token is in response.data.token
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Store token in local storage
            }

            // Handle successful login (store token, navigate, etc.)
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            console.error('Error during login:', error);
            // Handle login error (show message, etc.)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <div>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Sign In</button>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </form>
    );
};

export default SignIn;
