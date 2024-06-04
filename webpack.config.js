require("dotenv").config();
const HTMLWebpackPlugin = require('html-webpack-plugin')

const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "/src/index.jsx"),
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
