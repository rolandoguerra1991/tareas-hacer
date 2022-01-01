const fs = require("fs");
const file = "./db/data.json";
module.exports = {
  storeDB: (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
  },
  readDB: () => {
    if (!fs.existsSync(file)) {
      return null;
    }
    const info = fs.readFileSync(file, "utf8");
    data = JSON.parse(info);
    return data;
  },
};
