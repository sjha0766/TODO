const router = require('express').Router();
const Todo = require('../models/Todo');

// Router established here....

router.get('/', async (req, res) => {
  try {
    const allTodo = await Todo.find();
    res.render('index', { todo: allTodo });
  } 
  catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).send('Internal Server Error');
  }
 
});


module.exports = router;
