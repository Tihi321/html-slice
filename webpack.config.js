const path = require('path');
const webpack = require('webpack');

/* webpack */

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    bundle: path.resolve(__dirname, 'docs/src/') + '/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'docs/scripts'),
    filename: './[name].js'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/data/'
            }
          }
        ]
      }
    ]
  }
};
