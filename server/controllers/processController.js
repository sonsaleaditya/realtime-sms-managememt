// controllers/processController.js
const { startSession, stopSession, listSessions } = require('../services/processService');

const startProcess = async (req, res) => {
    const { sessionName, program } = req.body; // Ensure both parameters are received
    try {
        const message = await startSession(sessionName, program); // Pass both parameters
        res.status(200).json({ success: true, msg: message });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

const stopProcess = async (req, res) => {
    const { sessionName } = req.body;
    try {
        const message = await stopSession(sessionName);
        res.status(200).json({ success: true, msg: message });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

const getSessions = async (req, res) => {
    const { sessionName } = req.body; // Expecting session name in request body
    try {
        const sessions = await listSessions(sessionName); // Pass sessionName
        res.status(200).json({ success: true, sessions });
    } catch (error) {
        res.status(500).json({ success: false, msg: error });
    }
};




module.exports = { startProcess, stopProcess, getSessions };



