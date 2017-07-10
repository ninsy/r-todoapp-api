const path = require("path");
const webpack = require("webpack");

const config = {
  context: __dirname,
  target: "node",
  entry: ["./js/index.js"],
  devtool: "cheap-eval-source-map",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/public/"
  },
  resolve: {
    extensions: [".js", ".json"]
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: [new webpack.NamedModulesPlugin()],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  }
};

if (process.env.NODE_ENV === "production") {
  config.entry = "./js/index.js";
  config.devtool = false;
  config.plugins = [];
}

module.exports = config;
