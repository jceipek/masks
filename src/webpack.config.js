const path = require('path');

module.exports = {
  entry: './main.js',
  context: path.resolve(__dirname),
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: 'js-loader',
//         exclude: /node_modules/
//       }
//     ]
//   }, 
  resolve: {
    extensions: [ /* '.ts', */ '.js' ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist')
  }
};