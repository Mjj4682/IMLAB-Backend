/**
 * 에러 이름과 statusCode 를 정할 수 있다. new error(error name, statusCode)
 * @public
 */

module.exports = class errorConstructor extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }
};
