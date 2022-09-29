const { success } = require('../httpAPI/responseWrapper');
const Task = require('../model/task.mode');
const {NotFoundError}=require('../error/NotFoundError');

class TaskController {
  async addTask(req, res) {
    const {content } = req.body;
    const {id}=req.user
    const newTask = await Task({
      author: id,
      content: content,
    });

    await newTask.save();
    return res.json(success(newTask));
  }

  async listAllTaskOfUser(req, res) {
    const allTask = await Task.find({ author: req.params.userid });
    return res.json(success(allTask));
  }

  async listSingleTaskOfUser(req, res) {
    const task = await Task.findOne({_id:req.params.taskid,author:req.params.userid});
    if(!task){
      throw  new NotFoundError(req,`task with ${req.params.taskid} not found`)
    }
    return res.json(success(task));
  }


  async updateTaskOfUser(req, res) {
    const isUpdated = await Task.findOneAndUpdate({_id:req.params.taskid,author:req.params.userid}, req.body, { new: true });
    if(!isUpdated){
      throw new NotFoundError(req,`task with ${req.params.taskid} not found`)
    }
    return res.json(success(isUpdated));
  }

  async deleteTaskOfUser(req, res) {
    const isUpdated = await Task.findOneAndDelete({_id:req.params.taskid,author:req.params.userid});
    if(!isUpdated){
      throw new NotFoundError(req,`task with ${req.params.taskid} not found`)
    }
      return res.json(success(isUpdated));
  }


  async deleteAllTask(req, res) {
    const taskdeleted = await Task.deleteMany({ id: req.params.userid });
    res.json(success(taskdeleted));
  }
}

module.exports = TaskController;
