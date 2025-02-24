# Task Manager App

---

## Overview

For the backend, this app uses **NestJS** and **PostgreSQL** hosted on Docker. 
It implements the proper authentication using **bcrypt** for password hashing
and **JWT** for token verificiation.

The frontend uses **Vite** to make the React application. It also uses **Redux** to maintain
authentication state.

---

## Database Setup

For this application, the database runs on **Docker** 

Download the latest postgreSQL image through the terminal:

```commandline
docker pull postgres:latest
```

I have provided an `.env` file set to some default values. Feel free to change it to the appropriate
ports and credentials you will use.

```
POSTGRES_HOST = localhost
POSTGRES_PORT = 5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=taskmanagement

JWT_SECRET=RANDOM_KEY

VITE_URL=http://localhost:5173
```

Then go to the root directory of the project and run the following:

```commandline
cd backend
docker compose --env-file .env up -d
```
This runs PostgreSQL in a detached container.

---

## Backend

Through the same terminal or a different one, run the following:

```commandline
cd backend
npm install
npm run start:dev
```

## Frontend

Open a different terminal from the root directory and run the following:

```commandline
cd frontend
npm install
npm run dev
```
## Migrations

Open a new terminal and first generate a migration:

```commandline
cd backend
npm run migration:generate --name=<schema_name>
```
Then in the same directory run the migration:

```commandline
npm run migration:run
```

---

## Using the Application

Now go to http://localhost:5173 to access the application.

You can also click the link in the frontend terminal. It should look something like this:

```commandline
  VITE v6.1.1  ready in 862 ms

  ➜  Local:   http://localhost:5173
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Salary Expectations

$3000 per month

