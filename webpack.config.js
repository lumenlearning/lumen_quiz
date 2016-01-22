var path = require("path");

module.exports = {
  entry: "./app/App.js",
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          cacheDirectory: true
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      }
    ]
  },
  devServer: {
    inline: true,
    port: 3000,
    historyApiFallback: true,
    contentBase: '/Users/andrewhaupt/Desktop/lumen_quiz/build',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}