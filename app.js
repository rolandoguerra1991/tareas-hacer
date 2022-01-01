require("colors");

const {
  showMenu,
  pause,
  readInput,
  selectTask,
  confirm,
  checkTask,
} = require("./helpers/inquirer");
const Tasks = require("./models/tasks");
const { storeDB, readDB } = require("./helpers/saveFile");

const main = async () => {
  let option = "";
  const tasks = new Tasks();

  if (readDB()) {
    tasks.setTasks(readDB());
  }

  do {
    option = await showMenu();

    switch (option) {
      case "1":
        const description = await readInput("Enter a description:");
        tasks.createNewTask(description);
        break;
      case "2":
        tasks.getTasks();
        break;
      case "3":
        tasks.getTasks("completed");
        break;
      case "4":
        tasks.getTasks("pending");
        break;
      case "5":
        const ids = await checkTask(tasks.listTasks);
        tasks.toggleTasks(ids);
        break;
      case "6":
        const id = await selectTask(tasks.listTasks);
        if (id === "0") {
          break;
        }
        const confirmDelete = await confirm("Are you sure?".red);
        if (confirmDelete) {
          tasks.deleteTask(id);
          console.log("Task deleted".green);
        }
        break;
    }
    storeDB(tasks.listTasks);
    if (option !== "0") {
      await pause();
    }
  } while (option !== "0");
};

main();
