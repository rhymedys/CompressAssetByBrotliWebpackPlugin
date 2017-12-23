# CompressionBrotliWebpackPlugin
Compress assets by Brotli to serve them with Content-Encoding: br
## install
```javascript
  npm i compression-asset-by-brotli-webpack-plugin
```

##  import
``` javascript
  var CompressionAssetByBrotliWebpackPlugin = require('compression-asset-by-brotli-webpack-plugin');
```
##  Usage
```javascript
  new CompressionAssetByBrotliWebpackPlugin({
      asset: '[path].br[query]',
			test: /\.(js|css|html|svg)$/,
			threshold: 5000,  
			minRatio: 0.8
    })
```