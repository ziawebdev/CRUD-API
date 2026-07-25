# Task API

A simple CRUD REST API built with **Node.js** and **Express.js**. It allows users to create, read, update, and delete tasks. The API also includes Swagger documentation.

## Features

- Create a task
- Get all tasks
- Get a task by ID
- Update a task
- Delete a task
- Health check endpoint
- Swagger UI documentation

## Installation

### Clone the repository

```bash
git clone https://github.com/<zia kazmi>/<CRUD-API>.git
cd <CRUD-API>
```

### Install dependencies

```bash
npm install
```

### Run the server

```bash
npm run dev
```

The server runs at:

```
http://localhost:3000
```

Swagger documentation:

```
http://localhost:3000/docs
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Example cURL Output

Request:

```bash
curl -i http://localhost:3000/tasks/1
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": 1,
  "title": "Learn Express",
  "done": false
}
```

## Swagger UI

Open:

```
http://localhost:3000/docs
```

Add your Swagger UI screenshot here:

![Swagger Screenshot](images/Swagger UI.png)



## Why SQLite?

SQLite was chosen because it is lightweight, serverless, easy to set up, and stores all data in a single database file. It is ideal for learning backend development and building small applications.


## Database

The application automatically creates a SQLite database named:

tasks.db

It is stored in the project root directory.


## Installation

```bash
npm install
```

Run:

```bash
npm start
```

or

```bash
npm run dev
```

## Example SQL Query

```sql
SELECT * FROM tasks;
```


## SQLite Database

![Database Screenshot](images/database.png)



## Technologies Used

- Node.js
- Express.js
- Swagger UI Express


# Task API – BE-04 Containerize Your Stack

A RESTful Task Management API built with **Node.js**, **Express**, and **PostgreSQL**. This project began with a SQLite implementation and was migrated to PostgreSQL as part of the Backend AI Engineering BE-04 assignment.

## Features

- CRUD operations for tasks
- PostgreSQL database integration
- Environment variable configuration with `.env`
- Swagger API documentation
- Docker configuration (Dockerfile and docker-compose)
- Persistent database design using PostgreSQL

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg
- dotenv
- Swagger UI
- Docker & Docker Compose (configuration included)

---

## Project Structure

```
.
├── docker/
│   └── init/
│       └── init.sql
├── images/
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── database.js
├── main.js
├── openapi.json
├── package.json
├── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Copy `.env.example`

```bash
cp .env.example .env
```

Update the connection string.

Example:

```env
PORT=3000
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/cruddb
```

### 4. Start PostgreSQL

Create the database:

```sql
CREATE DATABASE cruddb;
```

Execute the SQL inside:

```
docker/init/init.sql
```

or run it manually in PostgreSQL.

### 5. Start the application

```bash
node main.js
```

Server:

```
http://localhost:3000
```

Swagger:

```
http://localhost:3000/docs
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | API Information |
| GET | /health | Health Check |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get a single task |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

---

# Example Request

POST `/tasks`

```json
{
  "title": "Learn PostgreSQL"
}
```

Response

```json
{
  "id": 4,
  "title": "Learn PostgreSQL",
  "done": false
}
```

---

# Database Migration

The project originally used SQLite (`tasks.db`) for storage.

As part of BE-04:

- SQLite was replaced with PostgreSQL.
- Database queries were updated to use the `pg` library.
- Environment variables are managed through `.env`.
- Database schema is initialized using `docker/init/init.sql`.

---

# Docker

This project includes:

- Dockerfile
- docker-compose.yml
- PostgreSQL initialization script

The intended workflow is:

```bash
docker compose up
```

which starts both:

- Application
- PostgreSQL

using a persistent Docker volume.

> **Note:** Due to a local Windows WSL/Docker Desktop issue during development, the application was tested using a locally installed PostgreSQL instance. The Docker configuration is included and is intended to be used once the Docker environment is functioning correctly.

---

# Persistence

Persistence was verified by:

1. Creating tasks.
2. Restarting the Node.js application.
3. Confirming the data remained available in PostgreSQL.

(The Docker volume persistence test is intended once Docker Desktop is operational.)

---

# Environment Variables

Create a `.env` file:

```env
PORT=3000
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/cruddb
```

---

# Assignment Requirements

- ✅ PostgreSQL integration
- ✅ Environment variables
- ✅ `.env.example`
- ✅ PostgreSQL initialization script
- ✅ Dockerfile
- ✅ docker-compose.yml
- ✅ CRUD API using PostgreSQL
- ✅ Swagger documentation
- ⚠ Docker runtime could not be validated due to a Windows WSL/Docker Desktop issue

---

# Future Improvements

- Complete Docker Compose validation after resolving WSL.
- Add Redis support.
- Refactor to a repository pattern.
- Add authentication with Supabase.
- Add automated API tests.

---


## Author

ZIA KAZMI