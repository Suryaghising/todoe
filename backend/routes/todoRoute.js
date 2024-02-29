const express = require("express");
const router = express.Router();
const {
  insertTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.post("/", insertTodo);
router.get("/", getAllTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
