module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: ['../../telefunc/dist/node/babel/babel-plugin-telefunc.js'],
  };
};
