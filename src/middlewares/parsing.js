require("dotenv").config();
const fs = require("fs");
const error = require("./errorConstructor");

const readFile = () => {
  try {
    const result = fs.readFileSync(process.env.CSV_URL, "utf-8");
    if (!result) {
      throw new error("fail: empty result", 500);
    }
    return result;
  } catch (err) {
    console.log(err);
    throw new error("read file error", 500);
  }
};

const rawDeliveryCost = readFile();

const data = rawDeliveryCost.split("\r\n");

const columns = data[0].split(",");

const result = {};

const processDeliveryCost = async () => {
  try {
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
  } catch (err) {
    throw new error("fail: processDeliveryCost", 500);
  }
};

module.exports = processDeliveryCost;
