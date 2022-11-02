const fs = require("fs");
const path = require("path");

const temp = fs.readFileSync(
  path.resolve(__dirname, "../../DeliveryCost.csv"),
  "utf-8"
);

const data = temp.split("\r\n");
const columns = data[0].split(",");
const result = {};

const onlyOne = async () => {
  for (let i = 2; i < columns.length; i++) {
    const rows = {};
    for (let j = 1; j < data.length; j++) {
      const value = data[j].split(",");
      const quantity = value[1];
      rows[quantity] = value[i];
    }
    result[columns[i]] = rows;
  }
  return result;
};

module.exports = onlyOne;
