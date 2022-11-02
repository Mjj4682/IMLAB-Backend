/**
 * imports environment variables
 */

const errorConstructor = require("./errorConstructor");

/**
 * 만약 비어있는 value 가 있다면 에러를 던진다.
 * [빈 배열] 도 에러를 던진다.
 * @param {object | any} obj
 */

const findKeyError = (obj) => {
  if (typeof obj === "object") {
    if (
      (Array.isArray(obj) && obj.length === 0) ||
      Object.keys(obj).length === 0
    ) {
      throw new errorConstructor("key_error", 400);
    }
    for (let i in obj) {
      if (!obj[i]) {
        throw new errorConstructor("key_error", 400);
      }
    }
  } else {
    if (!obj) {
      throw new errorConstructor("key_error", 400);
    }
  }
};

/**
 * module exports.
 * @public
 */

module.exports = {
  findKeyError,
};
