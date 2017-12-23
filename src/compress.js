/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2017-12-23 20:56:05
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-12-23 21:29:12
 */
const brotli = require('brotli')

/**
 * @description compress function
 * @param {any} content to compress content 
 * @param {any} options compress config
 * @param {any} callback after comressed content
 */
function compressByOriginBrotli(content, options, callback) {
  callback && callback(null, brotli.compress(content, options))
}
module.exports = function () {
  try {
    return compressByOriginBrotli
  } catch (e) {
    throw new Error(e)
  }
}