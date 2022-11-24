const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const tinyPngWebpackPlugin = require('tinypng-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  entry: {
    home: "./src/assets/js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./assets/js/[name].js",
  },
  mode: "production",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        // Then we apply postCSS fixes like autoprefixer and minifying
        loader: "postcss-loader"
      },
      {
        test: /\.pug$/,
        use: ["html-loader", "pug-html-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "./assets/images",
              name: "[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.mp4$/,
        use: [{ loader: "file-loader?name=videos/[name].[ext]" }],
      },
      {
        test: /\.(ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "./assets/images",
              name: "[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "./assets/fonts",
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },

  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "./[name].css",
    }),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/views/index.html",
      filename: "./index.html",
      chunks: ["home", "vendors"],
    }),
  ],
  devtool: "",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    // host: "192.168.40.36",
    // port: 8080,
    // publicPath: 'http://localhost:3200/dist/"',
  },
};

