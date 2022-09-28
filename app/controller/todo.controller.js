const { success } = require('../httpAPI/responseWrapper');
const Task = require('../model/task.mode');

class TaskController {
  async addTask(req, res) {
    const { user, content } = req.body;
    const newTask = await Task({
      author: user._id,
      content: content,
    });

    await newTask.save();
    return res.json(success(newTask));
  }

  async listAllTaskOfUser(req, res) {
    const allTask = await Task.find({ id: req.user.id });
    return res.json(success(allTask));
  }

  async listSingleTaskOfUser(req, res) {
    const task = await Task.findById(req.params.taskid);
    return res.json(success(task));
  }


  async updateTaskOfUser(req, res) {
    const isUpdated = await Task.findByIdAndUpdate(req.params.taskid, req.body, { new: true });
    res.json(success(isUpdated));
  }

  async deleteTaskOfUser(req, res) {
    const isUpdated = await Task.findByIdAndDelete(req.params.taskid);
    res.json(success(isUpdated));
  }


  async deleteAllTask(req, res) {
    const taskdeleted = await Task.deleteMany({ id: req.params.userid });
    res.json(success(taskdeleted));
  }
}

module.exports = TaskController;
