# Student Management REST API



**Objective:** Develop backend services using Node.js and Express.js.

---

## Practical Tasks

* [x] Create Node.js project
* [x] Build Express server
* [x] Develop Student CRUD APIs
* [x] Test APIs using Postman
* [x] Implement middleware

---

## Concepts Covered

* **Node.js**
* **Express.js**
* **REST API**
* **Middleware**
* **CRUD Operations**
* **HTTP Methods**
* **JSON**

---
## Table of Contents

* [Project Overview](#project-overview)
* [Architecture Overview](#architecture-overview)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Prerequisites](#prerequisites)
* [Quick Start](#quick-start)
* [Express Server Setup](#express-server-setup)
* [Student Data Model](#student-data-model)
* [API Reference](#api-reference)
* [CRUD Operations](#crud-operations)
* [Middleware](#middleware)
* [Postman Testing](#postman-testing)
* [HTTP Methods & Status Codes](#http-methods--status-codes)
* [API Request & Response Examples](#api-request--response-examples)
* [Project Workflow](#project-workflow)
* [Key Features](#key-features)
* [Learning Outcomes](#learning-outcomes)
* [Practical Checklist](#practical-checklist)
* [Conclusion](#conclusion)


## Project Overview

The **Student Management REST API** is a backend application developed using **Node.js** and **Express.js**.

It provides REST API endpoints to perform CRUD operations on student records.

The API allows users to:

1. Add a new student
2. View all students
3. View a student by ID
4. Update student information
5. Delete a student

> This project demonstrates the basic development of backend services using RESTful APIs.

---

## Technologies Used

| Technology     | Purpose                        |
| -------------- | ------------------------------ |
| **Node.js**    | JavaScript runtime environment |
| **Express.js** | Web framework for Node.js      |
| **REST API**   | Communication architecture     |
| **Postman**    | API testing                    |
| **JSON**       | Data exchange format           |
| **JavaScript** | Programming language           |

---

## Project Structure

```text
student-management-api/
│
├── node_modules/
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Prerequisites

Before running the project, make sure the following are installed:

* **Node.js**
* **npm**
* **Postman**
* **VS Code** or any code editor

Check Node.js installation:

```bash
node --version
```

Check npm installation:

```bash
npm --version
```

---

## Step 1: Create Node.js Project

Create a project folder:

```bash
mkdir student-management-api
```

Move into the project folder:

```bash
cd student-management-api
```

Initialize the Node.js project:

```bash
npm init -y
```

Install Express:

```bash
npm install express
```

---

## Step 2: Create Express Server

Create a file named:

```text
server.js
```

Add the following code:

```javascript
const express = require('express');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Student data
let students = [
    {
        id: 1,
        name: "Rahul",
        age: 20,
        course: "B.E. IT"
    },
    {
        id: 2,
        name: "Priya",
        age: 21,
        course: "B.E. IT"
    }
];

// Home route
app.get('/', (req, res) => {
    res.json({
        message: "Student Management REST API is running"
    });
});

// GET all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET student by ID
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.json({
        success: true,
        data: student
    });
});

// CREATE student
app.post('/students', (req, res) => {
    const { name, age, course } = req.body;

    const newStudent = {
        id: students.length + 1,
        name,
        age,
        course
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });
});

// UPDATE student
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { name, age, course } = req.body;

    student.name = name;
    student.age = age;
    student.course = course;

    res.json({
        success: true,
        message: "Student updated successfully",
        data: student
    });
});

// DELETE student
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        success: true,
        message: "Student deleted successfully",
        data: deletedStudent[0]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## Step 3: Run the Server

Start the Express server using:

```bash
node server.js
```

The terminal should display:

```text
Server running at http://localhost:3000
```

Open the following URL in your browser:

http://localhost:3000

Expected response:

```json
{
    "message": "Student Management REST API is running"
}
```

---

## REST API Endpoints

| Method   | Endpoint        | Description         |
| -------- | --------------- | ------------------- |
| `GET`    | `/`             | Check server status |
| `GET`    | `/students`     | Get all students    |
| `GET`    | `/students/:id` | Get student by ID   |
| `POST`   | `/students`     | Add new student     |
| `PUT`    | `/students/:id` | Update student      |
| `DELETE` | `/students/:id` | Delete student      |

---

## CRUD Operations

### Create

Use the **POST** method:

```text
POST /students
```

Request body:

```json
{
    "name": "Amit",
    "age": 20,
    "course": "B.E. IT"
}
```

Expected response:

```json
{
    "success": true,
    "message": "Student created successfully",
    "data": {
        "id": 3,
        "name": "Amit",
        "age": 20,
        "course": "B.E. IT"
    }
}
```

---

### Read All Students

Use the **GET** method:

```text
GET /students
```

Example response:

```json
[
    {
        "id": 1,
        "name": "Rahul",
        "age": 20,
        "course": "B.E. IT"
    },
    {
        "id": 2,
        "name": "Priya",
        "age": 21,
        "course": "B.E. IT"
    }
]
```

---

### Read Student by ID

Use:

```text
GET /students/1
```

Example response:

```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Rahul",
        "age": 20,
        "course": "B.E. IT"
    }
}
```

If the student does not exist:

```json
{
    "success": false,
    "message": "Student not found"
}
```

---

### Update Student

Use the **PUT** method:

```text
PUT /students/1
```

Request body:

```json
{
    "name": "Rahul Patel",
    "age": 21,
    "course": "B.E. IT"
}
```

Expected response:

```json
{
    "success": true,
    "message": "Student updated successfully",
    "data": {
        "id": 1,
        "name": "Rahul Patel",
        "age": 21,
        "course": "B.E. IT"
    }
}
```

---

### Delete Student

Use the **DELETE** method:

```text
DELETE /students/1
```

Expected response:

```json
{
    "success": true,
    "message": "Student deleted successfully",
    "data": {
        "id": 1,
        "name": "Rahul Patel",
        "age": 21,
        "course": "B.E. IT"
    }
}
```

---

## Middleware

Middleware is a function that runs between the **request** and the **response**.

In this project, Express JSON middleware is used:

```javascript
app.use(express.json());
```

It allows Express to read JSON data sent in the request body.

For example:

```json
{
    "name": "Amit",
    "age": 20,
    "course": "B.E. IT"
}
```

Without `express.json()`, the server cannot properly process this JSON request body.

> **Request → Middleware → Route → Response**

---

## Testing Using Postman

The APIs can be tested using **Postman**.

### GET All Students

1. Open Postman.
2. Select `GET`.
3. Enter:

```text
http://localhost:3000/students
```

4. Click **Send**.

---

### POST Student

Select:

```text
POST
```

Enter:

```text
http://localhost:3000/students
```

Go to:

```text
Body → raw → JSON
```

Enter:

```json
{
    "name": "Neha",
    "age": 20,
    "course": "B.E. IT"
}
```

Click **Send**.

---

### PUT Student

Select:

```text
PUT
```

Enter:

```text
http://localhost:3000/students/1
```

Request body:

```json
{
    "name": "Neha Patel",
    "age": 21,
    "course": "B.E. IT"
}
```

Click **Send**.

---

### DELETE Student

Select:

```text
DELETE
```

Enter:

```text
http://localhost:3000/students/1
```

Click **Send**.

---

## HTTP Methods Used

| Method   | Operation | Purpose               |
| -------- | --------- | --------------------- |
| `GET`    | Read      | Retrieve student data |
| `POST`   | Create    | Add a new student     |
| `PUT`    | Update    | Modify student data   |
| `DELETE` | Delete    | Remove a student      |

---

## HTTP Status Codes

| Status Code | Meaning               | Usage                        |
| ----------- | --------------------- | ---------------------------- |
| `200`       | OK                    | Successful request           |
| `201`       | Created               | Student successfully created |
| `404`       | Not Found             | Student does not exist       |
| `500`       | Internal Server Error | Server-side error            |

---

## REST API Flow

```text
Client / Postman
       |
       v
HTTP Request
       |
       v
Express Server
       |
       v
Middleware
       |
       v
API Route
       |
       v
Student Data
       |
       v
JSON Response
       |
       v
Client / Postman
```

---

## Important Concepts

### Node.js

**Node.js** is a JavaScript runtime that allows JavaScript to run outside the browser.

It is commonly used for developing backend applications and APIs.

### Express.js

**Express.js** is a lightweight web framework for Node.js.

It provides features for:

* Creating servers
* Defining routes
* Handling HTTP requests
* Sending responses
* Implementing middleware

### REST API

**REST** stands for **Representational State Transfer**.

A REST API uses HTTP methods such as:

```text
GET
POST
PUT
DELETE
```

to perform operations on resources.

In this project, the main resource is:

```text
Student
```

### Middleware

Middleware is software that executes between the incoming request and the final route handler.

Example:

```javascript
app.use(express.json());
```

---

## Learning Outcomes

After completing this practical, the student will be able to:

* [x] Create a Node.js project.
* [x] Create an Express.js server.
* [x] Understand REST API architecture.
* [x] Implement CRUD operations.
* [x] Use HTTP methods.
* [x] Implement Express middleware.
* [x] Send and receive JSON data.
* [x] Test APIs using Postman.

---

## Practical Checklist

* [x] Node.js project created
* [x] Express installed
* [x] Express server created
* [x] GET API implemented
* [x] POST API implemented
* [x] PUT API implemented
* [x] DELETE API implemented
* [x] Middleware implemented
* [x] APIs tested using Postman

---

## Conclusion

The **Student Management REST API** demonstrates how to develop basic backend services using **Node.js** and **Express.js**.

The project implements **CRUD operations** for student records and uses **middleware** to process JSON requests. The APIs can be tested using **Postman**.

> **Result:** The Student Management REST API was successfully developed and tested using Node.js, Express.js, REST API concepts, and middleware.
