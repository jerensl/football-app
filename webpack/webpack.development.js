const path = require("path")

const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = () => ({
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      chunks: ["app"],
      filename: "index.html",
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../src/club.html"),
      chunks: ["club"],
      filename: "club.html",
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "src"),
    compress: true,
    hot: true,
    port: 2202,
    publicPath: "/",
    historyApiFallback: true,
  },
})
