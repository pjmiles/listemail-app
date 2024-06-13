## GRIDIRON TEST 001

### SUMMARY
This application is an email listing app that allows a permmitted users perform features like:

* Manages and list email addresses for a specific User.
* Send individual emails with a customizable HTML message.
* Send bulk emails to multiple recipients.

### Built with
* VueJS for frontend
* Tailwindcss for styling
* NodeJS for the backend 
* MySQL for database storage

### Prerequisites

* VueJs3
* Node.js.
* MySQL database.
* An .env file with the following environment variables:
    * PORT=DB_PORT
    * DB_HOST=DB_HOST
    * USER=root
    * DB_PASSWORD=DB_PASSWORD
    * DB_NAME=DB_NAME
    * MY_SECRET=SECRET

#### Folder Structure

The project is divided into two main directories:

* The frontend directory is `listemail` which contains the Vue.js frontend code

* The backend directory is `listemail-backend` which contains the Node.js backend code

#### Environment Variable
Both frontend and backend has an `.env.example` file that contains the environment variables for the application.

#### Application Setup
1. Clone the repository:
3. cd frontend & `npm i` & `npm run dev`.
3. cd backend & `npm i` & `nodemon src/server.js`.

#### Created Default Credentials
You can login with any of the following credentials 
* `email`: abi@gridirontest.com,  `password`: password1,
* `email`: ruth@gridirontest.com,  `password`: password2,
* `email`: niran@gridirontest.com,  `password`: password3,
* `email`: victor@gridirontest.com,  `password`: password4