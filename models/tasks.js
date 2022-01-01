const Task = require("../models/task");

class Tasks {
  _list = {};

  constructor() {
    this._list;
  }

  get listTasks() {
    let list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });
    return list;
  }

  setTasks(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createNewTask(description) {
    const task = new Task(description);
    this._list[task.id] = task;
    return task;
  }

  getTasks(filter = null) {
    let list = "";
    let tasks;
    if (filter == "completed") {
      tasks = this.listTasks.filter((task) => task.completedAt != null);
    } else if (filter == "pending") {
      tasks = this.listTasks.filter((task) => !task.completedAt);
    } else {
      tasks = this.listTasks;
    }

    tasks.forEach((task, key) => {
      const idx = `${key + 1}`.green;
      const description = task.description;
      const completed = task.completedAt ? "[X]".green : "[ ]".red;
      list += `${idx} ${description} :: ${completed}\n`;
    });
    console.log(list);
  }

  deleteTask(id) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  toggleTasks(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedAt) {
        task.completedAt = new Date().toISOString;
      }
    });

    this.listTasks.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }
}

module.exports = Tasks;
