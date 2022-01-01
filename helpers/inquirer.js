const inquirer = require("inquirer");
require("colors");

const menuOptions = [
  {
    type: "list",
    name: "option",
    message: "Select an option: ",
    choices: [
      {
        name: `${"1.".green} Create a new task`,
        value: "1",
      },
      {
        name: `${"2.".green} Show all tasks list`,
        value: "2",
      },
      {
        name: `${"3.".green} Show completed tasks list`,
        value: "3",
      },
      {
        name: `${"4.".green} Show pending tasks list`,
        value: "4",
      },
      {
        name: `${"5.".green} Complete tasks`,
        value: "5",
      },
      {
        name: `${"6.".green} Delete tasks`,
        value: "6",
      },
      {
        name: `${"0.".green} Exit`,
        value: "0",
      },
    ],
  },
];

module.exports = {
  showMenu: async () => {
    console.clear();
    console.log("====================".green);
    console.log(" Select a option".white);
    console.log("==================== \n".green);

    const { option } = await inquirer.prompt(menuOptions);

    return option;
  },
  pause: async () => {
    console.log("\n");
    const { pause } = await inquirer.prompt([
      {
        type: "input",
        name: "enter",
        message: `Press ${"ENTER".green} to continue`,
      },
    ]);

    return pause;
  },
  readInput: async (message) => {
    const { description } = await inquirer.prompt([
      {
        type: "input",
        name: "description",
        message,
        validate: (value) => {
          if (value.length === 0) {
            return "Please enter a value";
          }
          return true;
        },
      },
    ]);

    return description;
  },
  selectTask: async (tasks = []) => {
    const choices = tasks.map((task, key) => {
      const idx = `${key + 1}.`.green;
      const description = task.description;
      return {
        name: `${idx} ${description}`,
        value: task.id,
      };
    });
    choices.unshift({
      name: `${"0.".green} Back`,
      value: "0",
    });
    const options = {
      type: "list",
      name: "id",
      message: "Select an task: ",
      choices,
    };
    const { id } = await inquirer.prompt(options);
    return id;
  },
  confirm: async (message) => {
    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message,
      },
    ]);

    return confirm;
  },
  checkTask: async (tasks = []) => {
    const choices = tasks.map((task, key) => {
      const idx = `${key + 1}.`.green;
      const description = task.description;
      return {
        name: `${idx} ${description}`,
        value: task.id,
        checked: task.completedAt !== null,
      };
    });
    const options = {
      type: "checkbox",
      name: "ids",
      message: "Select tasks to complete: ",
      choices,
    };
    const { ids } = await inquirer.prompt(options);
    return ids;
  },
};
