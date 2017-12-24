/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2017-12-23 20:56:05
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-12-23 22:49:03
 */
const brotli = require('brotli')

/**
 * @description compress function
 * @param {any} content to compress content
 * @param {any} options compress config
 * @param {any} callback after comressed content
 */
function compressByOriginBrotli(content, options, callback) {
  try {
    callback && callback(null, brotli.compress(content, options))

  } catch (e) {
    throw new Error('compressByOriginBrotli error', e)
  }
}
module.exports = compressByOriginBrotli