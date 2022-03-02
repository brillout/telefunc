const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [path.resolve(__dirname, 'node_modules/telefunc/dist/node/babel/babel-plugin-telefunc')],
    presets: ['babel-preset-expo'],
  };
};
