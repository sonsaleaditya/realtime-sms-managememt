// services/processService.js
const { exec, spawn } = require('child_process');

const path = require('path');

// services/processService.js
const sessionsMap = new Map(); // Store session names and their PIDs

const startSession = (sessionName, program) => {
    return new Promise((resolve, reject) => {
        if (!sessionName || !program) {
            return reject(new Error('Session name and program must be provided.'));
        }

        const child = spawn('python', [program], {
            detached: true, // Detach the process
            stdio: 'ignore' // Ignore stdio to prevent blocking
        });

        child.unref(); // Allow the parent to exit independently

        sessionsMap.set(sessionName, child.pid); // Store session name and PID
        resolve(`Session ${sessionName} started successfully with program ${program}.`);
    });
};




const stopSession = (sessionName) => {
    return new Promise((resolve, reject) => {
        exec(`taskkill /F /IM python.exe`, (error) => { // Change this line
            if (error) {
                reject(new Error(`Error stopping session: ${error.message}`));
            } else {
                resolve(`Session ${sessionName} stopped successfully.`);
            }
        });
    });
};

const listSessions = () => {
    return new Promise((resolve, reject) => {
        exec('tasklist', (error, stdout, stderr) => {
            if (error) {
                reject(`Error listing sessions: ${error.message}`);
            } else if (stderr) {
                reject(`Error: ${stderr}`);
            } else {
                const processes = stdout
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line.includes('python.exe'));

                // Create an array of session objects based on stored sessions
                const sessions = [...sessionsMap].map(([sessionName, pid]) => {
                    return {
                        name: 'python.exe',
                        pid: pid.toString(),
                        sessionName: sessionName,
                        sessionNumber: "N/A" // Adjust if needed
                    };
                });

                resolve(sessions);
            }
        });
    });
};







module.exports = { startSession, stopSession, listSessions };
