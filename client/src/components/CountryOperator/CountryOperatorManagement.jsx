import React, { useEffect, useState } from 'react';
import './CountryOperatorManagement.css'; // Create this file for styles

const CountryOperatorManagement = () => {
    const [operatorList, setOperatorList] = useState([]);
    const [country, setCountry] = useState('');
    const [operator, setOperator] = useState('');
    const [isHighPriority, setIsHighPriority] = useState(false);
    const [message, setMessage] = useState('');
    const [updateId, setUpdateId] = useState(null);

    useEffect(() => {
        fetchOperators();
    }, []);

    const fetchOperators = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/country-operators/fetch-operators');
            const data = await response.json();
            if (data.success && Array.isArray(data.pairs)) {
                setOperatorList(data.pairs);
            } else {
                setMessage('Fetched data is not valid.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setMessage('Failed to fetch operators.');
        }
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            // Use a single POST request for both creating and updating
            const url = 'http://localhost:5000/api/country-operators/reg-c-operator';
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    country, 
                    operator, 
                    isHighPriority,
                    id: updateId // Send the ID if updating
                }),
            });
    
            if (response.ok) {
                setMessage(updateId ? 'Operator updated successfully!' : 'Operator added successfully!');
                resetForm(); // Reset the form after submission
                fetchOperators(); // Refresh the operator list
            } else {
                setMessage('Failed to save operator.');
            }
        } catch (error) {
            console.error('Save error:', error);
            setMessage('An error occurred while saving the operator.');
        }
    };
    
    const resetForm = () => {
        setCountry('');
        setOperator('');
        setIsHighPriority(false);
        setUpdateId(null); // Reset for adding a new operator
    };

    const handleEdit = (op) => {
        setCountry(op.country);
        setOperator(op.operator);
        setIsHighPriority(op.isHighPriority);
        setUpdateId(op._id); // Set the ID for updating
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/country-operators/delete-operator/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMessage('Operator deleted successfully!');
                fetchOperators(); // Refresh the operator list
            } else {
                setMessage('Failed to delete operator.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            setMessage('An error occurred while deleting the operator.');
        }
    };

    return (
        <div className="operator-management-container">
            <h2 className="management-title">Country Operator Management</h2>
            <form onSubmit={handleSubmit} className="management-form">
                <label htmlFor="country">Country:</label>
                <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />

                <label htmlFor="operator">Operator Name:</label>
                <input type="text" id="operator" value={operator} onChange={(e) => setOperator(e.target.value)} required />

                <label>
                    <input type="checkbox" checked={isHighPriority} onChange={(e) => setIsHighPriority(e.target.checked)} />
                    High Priority
                </label>

                <button type="submit">{updateId ? 'Update Operator' : 'Add Operator'}</button>
            </form>
            {message && <p className="feedback-message">{message}</p>}
            
            <table className="operator-table">
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Operator</th>
                        <th>High Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(operatorList) && operatorList.length > 0 ? (
                        operatorList.map((op) => (
                            <tr key={op._id}>
                                <td>{op.country}</td>
                                <td>{op.operator}</td>
                                <td>{op.isHighPriority ? 'Yes' : 'No'}</td>
                                <td>
                                    <button onClick={() => handleEdit(op)}>Edit</button>
                                    <button onClick={() => handleDelete(op._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No operators found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CountryOperatorManagement;
