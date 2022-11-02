/**
 * try catch 반복될 경우 사용한다. 중복되는 코드를 감소.
 * @param {*} asyncController
 * @returns: 없음
 */

function errorHandler(asyncController) {
  return async (req, res) => {
    try {
      await asyncController(req, res);
    } catch (err) {
      console.log(err);
      res.status(err.status ? err.status : 500).json({ message: err.message });
    }
  };
}

/**
 * module exports
 * @public
 */

module.exports = errorHandler;
