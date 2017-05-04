module.exports = {
  entry: './lib/frizzy_dance.js',
  output: {
    filename: "./bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
