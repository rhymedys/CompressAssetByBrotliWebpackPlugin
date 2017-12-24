/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2017-12-23 21:15:17
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2017-12-24 10:34:19
 */

const async = require('async')
const url = require('url')
// const compressAdapter = require('./compress.js')
const RawSource = require('webpack-sources/lib/RawSource')
const brotli = require('brotli')


class CompressAssetByBrotliWebpackPlugin {
  constructor(options) {
    this.options = options
    this.asset = options.asset || '[path].br[query]'
    this.test = options.test || options.regExp
    this.threshold = options.threshold || 0
    this.minRatio = options.minRatio || 0.8
  }

  /**
   * @description the compress option  see more(https://github.com/MayhemYDG/iltorb#brotliencodeparams)
   * @returns
   * @memberof CompressAssetByBrotliWebpackPlugin
   */
  getCompressOptions() {
    const {
      options
    } = this
    return {
      mode: options.mode || 0,
      quality: options.quality || 11,
      lgwin: options.lgwin || 22,
      lgblock: options.lgblock || 0,
      enable_dictionary: options.enable_dictionary || true,
      enable_transforms: options.enable_transforms || false,
      greedy_block_split: options.greedy_block_split || false,
      enable_context_modeling: options.enable_context_modeling || false
    }
  }

  compress(content, callback) {
    return compressAdapter(content, this.getCompressOptions(), callback)
  }

  apply(compiler) {
    compiler
      .plugin('emit', function (compilation, callback) {
        const assets = compilation.assets
        async.forEach(Object.keys(assets), function (file, callback) {

          if (this.test && !this.test.test(file)) return callback()

          const asset = assets[file]
          let content = asset.source()
          if (!Buffer.isBuffer(content)) {
            content = new Buffer(content, 'utf-8')
          }

          const originalSize = content.length
          if (originalSize < this.threshold) return callback()

          this
            .compress(content, function (err, result) {
              if (err) return callback(err)

              if (result.length / originalSize > this.minRatio) return callback()

              const parse = url.parse(file)
              const sub = {
                file,
                fileWithoutExt: file
                  .split('.')
                  .slice(0, -1)
                  .join('.'),
                ext: file
                  .split('.')
                  .slice(-1)
                  .join(''),
                path: parse.pathname,
                query: parse.query || ''
              }

              const newFile = this
                .asset
                .replace(/\[(file|fileWithoutExt|ext|path|query)]/g, function (p0, p1) {
                  return sub[p1]
                })

              assets[newFile] = new RawSource(result)
              callback()
            }.bind(this))
        }.bind(this), callback)
      }.bind(this))
  }
}


module.exports = CompressAssetByBrotliWebpackPlugin
CompressAssetByBrotliWebpackPlugin.prototype.constructor = CompressAssetByBrotliWebpackPlugin