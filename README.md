# Backend challenge CRUD API

This is a RESTful API built with Node.js, Express.js, TypeORM, and PostgreSQL that allows users to perform basic CRUD operations (Create, Read, Update, Delete) on game titles. The API also includes user authentication and authorization using JWT (JSON Web Tokens).

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js ( https://nodejs.org/en/download/package-manager )
- Docker Desktop and Docker Compose ( https://www.docker.com/products/docker-desktop/ )

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/TonyDo99/backend-challenge.git
cd backend-challenge
```

### 2. Set Up Environment Variables

Create a .env file in the root of the project and add the following environment variables:

```javascript
PORT = 3000;
DB_HOST = database;
DB_PORT = 5432;
DB_USERNAME = yourusername;
DB_PASSWORD = yourpassword;
DB_DATABASE = gametitlesdb;
ACCESS_TOKEN_SECRET = your_jwt_secret;
```

### 3. Run Docker Compose

Build and run the Docker containers:

```bash
docker-compose build
docker-compose up
```

### 4. API Documentation

API documentation is available via Swagger. Once the application is running, you can access the documentation at:

http://localhost:3000/api-docs

## API Endpoints

# Authentication

POST /auth/register - Register a new user
POST /auth/login - Login a user and get a JWT token

# CRUD

GET /game-titles - Get all game titles (requires authentication)
GET /game-titles/:id - Get a game title by ID (requires authentication)
POST /game-titles - Create a new game title (requires authentication)
PUT /game-titles/:id - Update a game title by ID (requires authentication)
DELETE /game-titles/:id - Delete a game title by ID (requires authentication)
