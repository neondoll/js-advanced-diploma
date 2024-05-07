const { merge } = require('webpack-merge');

const common = require('./webpack.config.common');
const development = require('./webpack.config.dev');
const production = require('./webpack.config.prod');

module.exports = (env, args) => {
  switch (args.mode) {
  case 'development':
    return merge(common, development);
  case 'production':
    return merge(common, production);
  default:
    throw new Error('No matching configuration was found!');
  }
};
