require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//create app เพื่อใช้งาน express และตั้งค่า port
const app = express();
const port = process.env.PORT || 3000;
const db = process.env.MONGO_URI;

//setting middleware ให้ frontend เข้าถึง api ได้
app.use(cors());
// เพิ่มขนาด limit ของ image
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log('Connected to MongoDB'))
 .catch((err) => console.error('MongoDB connection error:',err));

//create table เก็บ todoList
const todoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    createdAt: {type: Date, default: Date.now},
    dueDate: {type: Date},
    priority: {type: String, enum: ['low','moderate','extreme'], default: 'extreme'},
    status: {type: String, enum: ['todo','inprogress','done'], default: 'todo'},
    note: {type: String, default: ''},
    image: {type: String, default: ''}
})
const Todo = mongoose.model('Todo', todoSchema);

//API สำหรับฟังก์ชันต่างๆของ TodoList
//Addlist -> post
app.post('/todos', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status,
        note: req.body.note,
        image: req.body.image
    })
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//ดึงข้อมูล todo จากตาราง -> get
app.get('/todos',async (req, res) => {
    try {
        const todo = await Todo.find();
        res.json(todo)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update todolist -> put
//รับข้อมูลมาครบทุกช่อง และอัพเดตทับข้อมูลเก่าทั้งหมด
app.put('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo) return res.status(404).json({ message: 'Todo not found' });

        todo.title = req.body.title || todo.title;
        todo.dueDate = req.body.dueDate || todo.dueDate;
        todo.priority = req.body.priority || todo.priority;
        todo.status = req.body.status || todo.status;
        todo.note = req.body.note || todo.note;
        todo.image = req.body.image || todo.image;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error){
        res.status(400).json({ message: error.message });
    }
});

//เหมือน put ต่างแค่ สำหรับ update ข้อมูลบางช่อง
//มันจะรับแค่ข้อมูลช่องที่เปลี่ยนมาอัพเดต
app.patch('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    // อัปเดตเฉพาะฟิลด์ที่ส่งมา (ในกรณีนี้ status)
    if (req.body.status) todo.status = req.body.status;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete todolist -> delete
app.delete('/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });

        res.json({ message: 'Deleted Todo' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



