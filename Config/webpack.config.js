const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js'
  },
  plugins: [
    new DotenvPlugin({ // makes vars available to the application js code
      path: '.env',
      sample: '.env',
      allowEmptyValues: true,
    }),
  ],
  target: 'node',
  mode: 'production',
};