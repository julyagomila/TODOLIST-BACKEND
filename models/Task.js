const mongoose = require("mongoose");

const Task = mongoose.model("task", {
  title: String,
  isDone: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Task;
