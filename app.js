const express = require('express');
const path = require('path');
const logger = require('morgan');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');

dotenv.config();
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Assuming you are using EJS as your template engine

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the indexRouter for routes starting with '/'
app.use('/', indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
