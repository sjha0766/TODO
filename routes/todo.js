const router = require("express").Router();
const Todo = require("../models/Todo");

router.post("/add/todo", async (req, res) => {
  try {
    const { todo } = req.body;

    if (!todo) {
      return res.status(400).send("Todo cannot be empty");
    }
    // Check if the todo already exists in the database
    const existingTodo = await Todo.findOne({ todo });
    if (existingTodo) {
      return res.redirect("/");
    }

    const newTodo = new Todo({ todo });

    await newTodo.save();
    console.log("Successfully added todo! ");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

router.get('/check/:todoValue', async (req, res) => {
    try {
      const { todoValue } = req.params;
  
      const existingTodo = await Todo.findOne({ todo: todoValue });
      res.json({ exists: !!existingTodo });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

router.get("/delete/todo/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await Todo.deleteOne({ _id });
    console.log("Deleted Todo Successfully in TodoList!");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
