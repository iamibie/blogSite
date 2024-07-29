# MERN Blog-Application
This project is built using the MERN stack (MongoDB, Express.js, React, Node.js) and demonstrates a fully functional Blog application.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- CRUD operations for user profiles and posts
- Responsive design for various devices
- Real-time updates with web sockets
- RESTful API implementation
- Secure password storage with bcrypt
- JWT-based user sessions


## Installation

To get a local copy up and running, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/iamibie/mernApp.git
    ```

2. Navigate to the project directory:
    ```sh
    cd mernApp
    ```

3. Install server dependencies:
    ```sh
    cd backend
    npm install
    ```

4. Install client dependencies:
    ```sh
    cd ../frontend
    npm install
    ```

5. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

6. Start the development server:
    ```sh
    cd backend
    npm run dev
    ```

## Usage

To use the application:

1. Open your browser and go to `http://localhost:3000`.
2. Register for a new account or log in with an existing one.
3. Explore the features such as creating, updating, and deleting posts.

## Technologies Used

- **MongoDB**: NoSQL database for storing application data
- **Express.js**: Web framework for Node.js
- **React**: JavaScript library for building user interfaces
- **Node.js**: JavaScript runtime for the backend
- **Redux**: State management for React applications
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Library for hashing passwords
- **WebSockets**: Real-time communication

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m 'Add your feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
