const baseCgi = require('../../lib/base-cgi');

const defaultData = {
  'result': 0,
  'err': ''
};

/**
 * 获得成功类型的数据
 *
 * @param {Object | Promise} data 可能是plain object，也可能是 Promise
 * @returns {Promise}
 */
function getSuccessData(data = {}) {
  return baseCgi.success(data, defaultData);
}

/**
 * 获得失败类型的数据
 *
 * @param {Number | Promise} errCode 可能是Number，也可能是 Promise
 * @param {String} [errMsg] 错误信息
 * @returns {Promise}
 */
function getErrorData(errCode, errMsg) {
  return baseCgi.error(errCode, errMsg);
}

module.exports = {
  getSuccessData: getSuccessData,
  getErrorData: getErrorData
};