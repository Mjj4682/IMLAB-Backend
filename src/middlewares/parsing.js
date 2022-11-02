/**
 * imports environment variables
 */

require("dotenv").config();

/**
 * module dependencies.
 * @public
 */

const fs = require("fs");
const path = require("path");
const error = require("./errorConstructor");

/**
 * read csv
 * @type string
 */

const rawDeliveryCost = fs.readFileSync(
  path.resolve(__dirname, "../../DeliveryCost.csv"),
  "utf-8"
);

/**
 * @summary csv 파일을 가공.
 * @return {...someNation: {...someQuantity(type: string): 2000(type: number)...}...}
 * @type object.
 */

const processDeliveryCost = async () => {
  try {
    const result = {};
    const data = rawDeliveryCost.split("\r\n");
    const columns = data[0].split(",");

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

/**
 * module exports.
 * @public
 */

module.exports = processDeliveryCost;
