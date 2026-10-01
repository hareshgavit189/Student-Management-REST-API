const express = require('express');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

//Dummy Student Data
const students = [
    {
        id: 1,
        name: "Rahul",
        age: 20,
        course: "B.E. IT"
    },
    {
        id: 2,
        name: "Kiran",
        age: 21,
        course: "B.E. Electrical"
    },
    {
        id: 3,
        name: "darshan",
        age: 19,
        course: "B.E. Electrical"
    },
    {
        id: 4,
        name: "Nell",
        age: 21,
        course: "B.E. Civil"
    },
    {
        id: 5,
        name: "Ankit",
        age: 20,
        course: "B.E. Civil"
    }
];

// Home Route
app.get('/', (req,res)=>{
    res.json({message: "Student Management REST API is running"});
})

//GET all Students
app.get('/students', (req,res)=>{
    res.json({students: students});
})

//GET student by Id
app.get('/students/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const student = students.find(s=>s.id === id);

    if(!student){
        return res.status(404).json({
            success: false,
            message: "Student NOT found!"
        });
    }
    res.json({success: true, message: "Student found successfully.", data: student});
});

// CREATE student
app.post('/students', (req,res)=>{
    const {name, age, course} = req.body;

    const newStudent = {
        id: students.length+1,
        name: name,
        age: age,
        course: course
    }
    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });
})

// Update a student
app.put('/students/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const student = students.find(s=>s.id === id);

    if(!student){
        return res.status(404).json({
            success: false,
            message: "Student NOT found!"
        });
    }

    const {name, age, course} = req.body;
    student.name = name;
    student.age = age;
    student.course = course;

    res.status(201).json({
        success: true,
        message: "Student Updated Successfully.",
        data: student 
    });
})

//Delete a student
app.delete('/students/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    const index = students.findIndex(s=>s.id === id);

    if(index === -1){
        return res.status(404).json({
            success: false,
            message: "Student NOT found!"
        })
    }

    const deleteStudent = students.splice(index, 1);
    res.json({
        success: true,
        message: "Student deleted successfully.",
        data: deleteStudent
    });
});

// Start server
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})