const path = require("path");

module.exports = {
  // 1. Entry: The entry point of your application (where Webpack starts bundling)
  entry: "./src/index.js",

  // 2. Output: Where the bundled files will be output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  // 3. Loaders: How to process different types of files (CSS, images, etc.)
  module: {
    rules: [
      {
        test: /\.js$/, // Regex to test for .js files
        exclude: /node_modules/, // Exclude files from node_modules
        use: {
          loader: "babel-loader", // Use Babel to transpile JavaScript
        },
      },
      {
        test: /\.css$/, // Regex to test for .css files
        use: ["style-loader", "css-loader"], // Use style-loader and css-loader for CSS
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Regex to test for image files
        type: "asset/resource", // Handle images as resources
      },
    ],
  },

  // 4. Plugins: Additional tools to optimize the build process
  plugins: [],

  // 5. Mode: Set the mode to 'development' or 'production'
  mode: "development", // You can change to 'production' when deploying

  // 6. Devtool: Set source maps for easier debugging
  devtool: "inline-source-map",

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  // 7. DevServer: Set up a development server (for live-reloading)
  devServer: {
    static: "./dist", // Folder to serve files from
    open: true, // Automatically open the browser
    hot: true, // Enable Hot Module Replacement (HMR)
  },
};
