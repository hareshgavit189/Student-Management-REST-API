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
            message: "Student NOT Found!"
        });
    }
    res.json({success: true, data: student});
});

// Start server
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})