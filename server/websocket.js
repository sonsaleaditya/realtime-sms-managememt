const WebSocket = require('ws');

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('New client connected');

        // Handle incoming messages
        ws.on('message', (message) => {
            console.log('Received:', message);
        });

        // Cleanup on disconnect
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    // Broadcast function to send messages to all connected clients
    const broadcastMetricsUpdate = (metrics) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(metrics));
            }
        });
    };

    return { broadcastMetricsUpdate }; // Return function for external use
};

module.exports = { setupWebSocket };
