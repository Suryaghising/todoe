const asyncHandler = require("express-async-handler");
const { Todo } = require("../models");

// @desc    add todo
// @route   POST /api/todos
// access   public
const insertTodo = asyncHandler(async (req, res) => {
  const { task_name, priority } = req.body;
  const todo = await Todo.create({
    task_name: task_name,
    priority: priority,
  }).catch((err) => {
    console.log(err);
    throw new Error(err.message);
  });
  const newTodo = await Todo.findOne({ where: { id: todo.id } }).catch(
    (err) => {
      console.log(err);
      throw new Error(err.message);
    }
  );
  res.status(200).json(newTodo);
});

// @desc    fetch all todos
// @route   POST /api/todos
// access   public
const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.findAll().catch((err) => {
    console.log(err);
    throw new Error(err.message);
  });
  res.status(200).json(todos);
});

// @desc    update todos
// @route   PUT /api/todos/:id
// access   public
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!todo) {
    res.status(400);
    throw new Error("No goal found");
  }

  const { task_name, priority } = req.body;

  await Todo.update(
    { task_name: task_name, priority: priority },
    {
      where: {
        id: req.params.id,
      },
    }
  ).catch((err) => {
    console.log(err);
    throw new Error(err.message);
  });
  const newTodo = await Todo.findOne({ where: { id: req.params.id } }).catch(
    (err) => {
      console.log(err);
      throw new Error(err.message);
    }
  );
  res.json(newTodo);
});

// @desc    delete todos
// @route   DELETE /api/todos/:id
// access   public
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!todo) {
    res.status(400);
    throw new Error("No goal found");
  }

  await Todo.destroy({
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    console.log(err);
    throw new Error(err.message);
  });
  res.json({ id: req.params.id, message: "Todo deleted successfully" });
});

module.exports = { insertTodo, getAllTodos, updateTodo, deleteTodo };
