const express = require('express');
const indexRouter = require('./routes/index');
const todoRouter = require('./routes/todo');
const connectToMongo=require('./config/db');
const app = express();
const port = 3000;


// Connection to MongoDB
  connectToMongo();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.json());

// Routes
app.use('/', indexRouter);
app.use('/todo', todoRouter);

// Server configurations
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
