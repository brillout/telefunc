// Expo doesn't seem to support `babel.config.json` nor `babelrc.json`
module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ['telefunc/babel'],
    presets: ['babel-preset-expo'],
  };
};
