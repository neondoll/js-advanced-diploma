const path = require('path');

module.exports = {
  devServer: {
    // compress          : true,
    // historyApiFallback: true,
    open: true,
    port: 9000,
    watchFiles: path.join(__dirname, 'src'),
  },
  mode: 'development',
};
