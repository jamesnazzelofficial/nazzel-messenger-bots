import path from 'path';
import webpack from 'webpack';

export default {
  entry: './index.js', // Entry point of your application
  output: {
    path: path.resolve('dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel loader for transpiling JavaScript
        },
      },
      {
        test: /\.css$/, // Apply this rule to .css files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these file extensions
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "fs": false,
      "http": require.resolve("stream-http"),
      "net": false,
      "stream": require.resolve("stream-browserify"),
      "querystring": require.resolve("querystring-es3"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  mode: 'production', // Set the mode to production
};
