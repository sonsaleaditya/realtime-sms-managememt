
# API Documentation

## Base URL
All endpoints use the base URL:
```
http://localhost:5000/api
```

### **Authentication**

#### Sign-Up
- **URL**: `/auth/sign-up`
- **Method**: `POST`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "aditya sonsale",
    "username": "adit@gmail.com",
    "password": "adit"
  }
  ```

#### Sign-In
- **URL**: `/auth/sign-in`
- **Method**: `POST`
- **Description**: Authenticate an existing user.
- **Request Body**:
  ```json
  {
    "username": "adit@gmail.com",
    "password": "adit"
  }
  ```

---

### **Country Operators**

#### Register Country Operator
- **URL**: `/country-operators/reg-c-operator`
- **Method**: `POST`
- **Description**: Register a new country operator with priority status.
- **Request Body**:
  - Example for Airtel:
    ```json
    {
      "country": "India",
      "operator": "Airtel",
      "highPriority": true
    }
    ```
  - Example for JIO:
    ```json
    {
      "country": "India",
      "operator": "JIO",
      "isHighPriority": true
    }
    ```

#### Fetch Country Operators
- **URL**: `/country-operators/fetch-operators`
- **Method**: `GET`
- **Description**: Retrieve a list of registered country operators.

#### Delete Country Operator
- **URL**: `/country-operators/delete-operator/:id`
- **Method**: `DELETE`
- **Description**: Delete a specific country operator using its ID.
- **Path Parameter**:
  - `id` - Operator's unique identifier to delete.

---

### **SMS Management**

#### Send SMS
- **URL**: `/sms/send`
- **Method**: `POST`
- **Description**: Send an SMS to a specified phone number.
- **Request Body**:
  ```json
  {
    "phoneNumber": "+91123584544",
    "message": "Hello RUTS",
    "country": "India",
    "operator": "Jio"
  }
  ```

#### Fetch SMS Metrics
- **URL**: `/sms-metrics/fetch-sms-metrics`
- **Method**: `GET`
- **Description**: Retrieve metrics on sent SMS messages.

---

### **Process Management**

#### Start Process
- **URL**: `/process/start`
- **Method**: `POST`
- **Description**: Start a new process with a given session name and program.
- **Request Body**:
  ```json
  {
    "sessionName": "mySession",
    "program": "program1.py"
  }
  ```

#### Stop Process
- **URL**: `/process/stop`
- **Method**: `POST`
- **Description**: Stop a process with a given session name.
- **Request Body**:
  ```json
  {
    "sessionName": "mySession"
  }
  ```

#### Fetch Active Sessions
- **URL**: `/process/sessions`
- **Method**: `GET`
- **Description**: Retrieve a list of active process sessions.

--- 

Each endpoint expects JSON payloads and returns responses in JSON format. Adjust the data fields as needed depending on the application’s requirements.