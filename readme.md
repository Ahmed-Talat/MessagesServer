# Node/Express API Server for Managing Messages (MongoDB Connected)

This is a simple Node.js/Express application that serves as an API server for managing messages. It is connected to a MongoDB database to store and retrieve message data. The application provides basic CRUD (Create, Read, Delete) operations for messages, allowing users to create, view, and delete messages.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (at least version 18.10.0)
- npm or yarn package manager
- Git (optional, for version control)

Install dependencies:

```
    npm install # or yarn install
```

## Running the Application

To run the application in development mode, use the following script:

```
    npm run dev
```

## Running Tests

This project uses Jest and Supertest for testing. To run the tests, use the following script:

```
   npm test
```

## Environment Variables

You can configure environment-specific variables by creating a .env file in the project root. Define your variables there, and they will be automatically loaded when you run the application.

Example .env file:
 ```
URL="mongodb://localhost/yourdb"
DB_NAME="DbName"
 ```
