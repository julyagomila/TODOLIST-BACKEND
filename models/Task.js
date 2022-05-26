const mongoose = require("mongoose");

const Task = mongoose.model("task", {
  title: String,
});

module.exports = Task;
