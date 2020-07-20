const path = require("path")

const { merge } = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const { InjectManifest } = require("workbox-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const modeConfig = (env) => require(`./webpack/webpack.${env}`)(env)
const loadPresets = require("./webpack/loadPresets")

module.exports = (
  { mode: mode = "production", presets: presets = [] } = { mode, presets },
) => {
  return merge(
    {
      mode,
      context: path.resolve(__dirname, "src"),
      entry: {
        app: "./app.js",
        club: "./club.js",
      },
      output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
          },
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: false,
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
          patterns: [
            { from: "images/", to: "images/" },
            { from: "./manifest.json", to: "manifest.json" },
            { from: "pages/", to: "pages/" },
          ],
        }),
        new InjectManifest({
          swSrc: "./src-sw.js",
          swDest: "sw.js",
        }),
      ],
    },
    modeConfig(mode),
    loadPresets({
      mode,
      presets,
    }),
  )
}
