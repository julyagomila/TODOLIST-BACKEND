const express = require("express");
const router = express.Router();

//import du modèle Task
const Task = require("../models/Task");
const User = require("../models/User");

const isAuthenticated = require("../middlewares/isAuthenticated");

// **Create** // URL: http://localhost:3001/create/task
router.post("/create/task", isAuthenticated, async (req, res) => {
  try {
    const newTask = new Task({
      title: req.fields.title,
      user: req.user,
    });
    console.log(newTask);
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **Read** // URL : http://localhost:3001/get/all/tasks
router.get("/get/all/tasks", isAuthenticated, async (req, res) => {
  try {
    // On recherche, grâce à la fonction find(), tous les documents de la collection "tasks" :
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **Read** // URL : http://localhost:3001/get/task/by/name
router.get("/get/task/by/name", async (req, res) => {
  try {
    // On recherche, grâce à la fonction find(), tous les documents de la collection "task" :
    const taskByName = await Task.find({ title: req.query.title });
    res.json(taskByName);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **Update Task** // URL: http://localhost:3001/update
router.post("/update", async (req, res) => {
  try {
    if (req.fields.id) {
      const taskToUpdate = await Task.findById(req.fields.id);
      taskToUpdate.title = req.fields.title;
      await taskToUpdate.save();
      res.status(200).json({ message: "task successfully upadted" });
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **Update Checkbox** // URL: http://localhost:3001/update/checkbox
router.post("/update/checkbox", async (req, res) => {
  try {
    if (req.fields.id) {
      const taskToUpdate = await Task.findById(req.fields.id);
      taskToUpdate.isDone = !taskToUpdate.isDone;
      await taskToUpdate.save();
      res.status(200).json({ message: "task successfully upadted" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **Delete** //
router.post("/delete/task", async (req, res) => {
  try {
    if (req.fields.id) {
      await Task.findByIdAndDelete(req.fields.id);
      res.json({ message: "Task successfully deleted" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
