const HTMLWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const { DefinePlugin } = require("webpack")

module.exports = () => ({
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
})
