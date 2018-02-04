/**
 *   ./webpack.config.js
 */
 const path = require('path');
 module.exports = {
   entry: './src/index.js',
   output: {
     path: path.resolve('src'),
     filename: 'bundle.js'
   },
   module: {
     loaders: [
       {test: /\.js[x]?$/, loader:'babel-loader', exclude: /node_modules/},
     ],
   }
 }
