const express = require('express');
const userRouter = require('./src/routes/users');
const loginRouter = require('./src/routes/login');
const taskRouter = require('./src/routes/tasks');
const error = require('./src/middlewares/error');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/', userRouter);
app.use('/', loginRouter);
app.use('/', taskRouter);

app.use(error);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));