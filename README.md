

# Dynamic SMS Management Web Application

![Logo](path/to/logo.png) <!-- Optional: Add your logo here -->

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)
   - [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Folder Structure](#folder-structure)
7. [Usage](#usage)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

---

## Overview

The **Dynamic SMS Management Web Application** is a full-stack solution designed to manage SMS operations efficiently. It allows users to send SMS messages dynamically, manage country-operator pairs, and monitor SMS metrics in real-time, providing a seamless experience for SMS management.

## Features

- **User Authentication**: Secure JWT-based authentication for user access.
- **Dynamic Process Management**: Start and stop SMS sending processes on demand.
- **Country-Operator Management**: Store and manage country-operator pairs in a database.
- **Real-Time Metrics**: Monitor SMS metrics with Grafana dashboards.
- **Notifications**: Alerts and notifications via Telegram.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB for country-operator management and MySQL for SMS metrics
- **Containerization**: Docker
- **Monitoring**: Prometheus and Grafana for real-time metrics
- **Communication**: Twilio and Telegram Bot API for SMS and notifications

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v12 or later)
- **Docker** and **Docker Compose**
- **MongoDB** and **MySQL** (or use Docker containers)
- **Twilio Account** for SMS functionality
- **Telegram Bot API Token**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/dynamic-sms-management-web-app.git
   cd dynamic-sms-management-web-app
   ```

2. **Navigate to the client and server directories:**

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

### Configuration

1. **Set up environment variables:**

   Create a `.env` file in both the `server` and `client` directories:

   - **Server:**
     ```plaintext
     PORT=5000
     NODE_ENV=production
     DATABASE_URL=mongodb://username:password@mongo:27017/mydatabase
     TWILIO_ACCOUNT_SID=your_twilio_account_sid
     TWILIO_AUTH_TOKEN=your_twilio_auth_token
     TELEGRAM_CHAT_ID=your_telegram_chat_id
     ```

   - **Client:**
     ```plaintext
     REACT_APP_API_URL=http://localhost:5000/api
     ```

2. **Start the Docker containers (if using Docker):**

   ```bash
   docker-compose up --build
   ```

### Running the Application

- Access the application in your browser at [http://localhost:3000](http://localhost:3000).
- The server API is available at [http://localhost:5000/api](http://localhost:5000/api).

## API Endpoints

| Method | Endpoint                             | Description                                 |
|--------|--------------------------------------|---------------------------------------------|
| GET    | `/api/process/sessions`             | Retrieve active SMS processes               |
| POST   | `/api/process/start`                | Start a new SMS process                     |
| POST   | `/api/process/stop`                 | Stop an active SMS process                  |
| POST   | `/api/sms/send`                     | Send an SMS message                         |

## Folder Structure

```plaintext
dynamic-sms-management-web-app/
├── client/                           # Frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
└── server/                           # Backend application
    ├── src/
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── .env
    └── package.json
```

## Usage

1. **User Registration**: Users can sign up through the SignUp component.
2. **User Login**: Users can log in to access the dashboard.
3. **Send SMS**: Use the SendSMS component to send messages dynamically.
4. **Monitor Metrics**: View real-time SMS metrics on the dashboard.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact:

- **ADITYA SONSALE**: [sonsaleaditya@gmail.com](sonsaleaditya@gmail.com)
- **GitHub**: [sonsaleaditya](https://github.com/sonsaleaditya)
