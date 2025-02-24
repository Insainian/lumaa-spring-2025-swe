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

Download the latest postgreSQL image on the command line:

```commandline
docker pull postgres:latest
```

Then go to the root directory of the project and run the following:

```commandline
docker compose --env-file .env up -d
```
This runs PostgreSQL in a detached container.

---

## Backend

Change directories to the backend folder and install dependencies through the terminal:

```commandline
cd backend
npm install
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
Now in the same terminal run the following:

```
npm run start:dev
```

## Frontend

Open a different terminal and run the following:

```commandline
cd frontend
npm install
npm run dev
```
## Migrations

First generate a migration:

```commandline
cd backend
npm run migration:generate --name=<schema_name>
```

And then in another terminal run the migration:

```commandline
cd backend
npm run migration:run
```

---

## Salary Expectations

$3000 per month

