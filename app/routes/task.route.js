const route = require('express').Router();
const TaskController = require('../controller/todo.controller');
const { verifyJwt } = require('../middlewares/jwt');
const { loadUser, allowUserOnly } = require('../middlewares/access');
const taskValidation = require('../validation/task.validation');

const Task = new TaskController();

route.use(verifyJwt);
route.get('/:userid/list', allowUserOnly, Task.listAllTaskOfUser);
route.get('/:userid/list/:taskid', allowUserOnly, Task.listSingleTaskOfUser);
route.delete('/:userid/list/:taskid', allowUserOnly, Task.deleteTaskOfUser);
route.delete('/:userid', allowUserOnly, Task.deleteAllTask);

route.delete('/:userid/list/:taskid', allowUserOnly, Task.deleteTaskOfUser);
route.put('/:userid/list/:taskid', taskValidation.updateTaskValidation, allowUserOnly, Task.updateTaskOfUser);
route.use(loadUser);
route.post('/add', verifyJwt, Task.addTask);


module.exports = route;
