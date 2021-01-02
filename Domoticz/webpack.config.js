const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js'
  },
  module: {   
    rules: [
      {
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
      },  
    ] 
  },
  target: 'node',
  mode: 'production',
};