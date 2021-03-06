var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: true,
    frameworks: [ 'jasmine' ],
    files: [
      'tests.webpack.js',
      "https://tinymce.cachefly.net/4.2/tinymce.min.js"
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots' ],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};