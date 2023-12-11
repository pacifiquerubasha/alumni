# Project  ALUmineers README - MERN Application (MVC Architecture)

## Introduction
This is a simple web application that uses the Model-View-Controller (MVC) architecture. The backend is built using Express.js and MongoDB, while the frontend is powered by ReactJS with Vite. This README will guide you through the installation and setup process.

## Prerequisites
Before you get started, ensure that you have the following prerequisites installed on your system:
- Node.js (https://nodejs.org/)
- npm (Node Package Manager, included with Node.js)

## Installation

### Backend (Express)
1. Navigate to the project's root directory using your terminal.
2. Run the following command to install the backend packages:

```console
npm install
```

### Frontend (ReactJS)
1. Navigate to the "views" directory within the project using your terminal.
2. Run the following command to install the frontend packages:

```console
npm install
```


## Configuration
1. You might need to configure environment variables or database connections for your specific use case. The configuration files are typically located in the "config" directory for the backend.

## Usage

To start both the frontend and backend concurrently:

1. In the project's root directory, run the following command:

```console
npm start
```


This will launch both the backend and frontend servers concurrently, making it easy to run the application. You can access the application by opening a web browser and navigating to the specified address (usually `http://localhost:3000/` for the frontend).

## Project Structure
- `middlewares` - Contains the app middlewares.
- `index.js` - The main Express application file.
- `routes` - Contains route definitions for the MVC architecture.
- `controllers` - Contains controller functions to handle business logic.
- `models` - Contains data models for the application.
- `uploads` - Upload files.
- `utils` - Contains reusable functions

- `views` - Contains the ReactJS frontend code.
- `views/src` - Source code for the React application.
- `views/public` - Static files (e.g., HTML, images) for the React application.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing
Contributions are not yet open for this project. We would, however, appreciate your opinions on the progress.

## Contact
If you have any questions or need further assistance, please contact p.kishinyambwe@alustudent.com.

Thank you for using our ALUmineers app!
