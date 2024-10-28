import React from 'react';
import StartProcess from '../Process/StartProcess';
import StopProcess from '../Process/StopProcess';
import './ProgramControl.css'; // Create a CSS file for styling if needed

const ProgramControl = () => {
    return (
        <div className="program-control-container">
            <h2>Program Control</h2>
            <StartProcess />
            <StopProcess />
            {/* You can add more controls or information here */}
        </div>
    );
};

export default ProgramControl;
