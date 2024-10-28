import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OperatorManagement = () => {
    const [country, setCountry] = useState('');
    const [operator, setOperator] = useState('');
    const [isHighPriority, setIsHighPriority] = useState(false);
    const [operatorList, setOperatorList] = useState([]); // Initialize as an empty array

    // Fetch the operator list on component mount
    useEffect(() => {
        const fetchOperators = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/country-operators/fetch-operators');
                // Check if response data is an array
                if (Array.isArray(response.data)) {
                    setOperatorList(response.data); // Set the operator list
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching operators:', error);
            }
        };

        fetchOperators();
    }, []);

    const addOperator = async () => {
        if (country && operator) {
            try {
                const response = await axios.post('http://localhost:5000/api/country-operators/reg-c-operator', {
                    country,
                    operator,
                    isHighPriority,
                });
                // Assuming the response contains the new operator object
                if (response.data) {
                    setOperatorList([...operatorList, response.data]); 
                    setCountry('');
                    setOperator('');
                    setIsHighPriority(false);
                }
            } catch (error) {
                console.error('Error adding operator:', error);
            }
        }
    };

    const removeOperator = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/country-operators/delete-operator/${id}`);
            setOperatorList(operatorList.filter(op => op._id !== id)); // Filter out the removed operator
        } catch (error) {
            console.error('Error removing operator:', error);
        }
    };

    return (
        <div className="operator-management">
            <h3>Country-Operator Management</h3>
            <input 
                type="text" 
                placeholder="Country" 
                value={country} 
                onChange={(e) => setCountry(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Operator" 
                value={operator} 
                onChange={(e) => setOperator(e.target.value)} 
            />
            <label>
                <input 
                    type="checkbox" 
                    checked={isHighPriority} 
                    onChange={(e) => setIsHighPriority(e.target.checked)} 
                />
                High Priority
            </label>
            <button onClick={addOperator}>Add Operator</button>
            <div className="operator-list">
                <h4>Operators List:</h4>
                <ul>
                    {Array.isArray(operatorList) ? (
                        operatorList.map((op) => (
                            <li key={op._id}>
                                {op.country} - {op.operator} {op.isHighPriority ? "(High Priority)" : ""}
                                <button onClick={() => removeOperator(op._id)}>Remove</button>
                            </li>
                        ))
                    ) : (
                        <li>No operators available</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default OperatorManagement;
