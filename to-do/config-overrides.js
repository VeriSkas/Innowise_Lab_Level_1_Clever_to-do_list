const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  const modifiedConfig = alias({
    '@assets': './src/assets',
    '@components': './src/components',
    '@constants': './src/constants',
    '@pages': './src/pages',
    '@queries': './src/queries',
    '@utils': './src/utils',
    '@validation': './src/validation',
    '@styles': './src/constants/styles',
  })(config);

  return modifiedConfig;
};
