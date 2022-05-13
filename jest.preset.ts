let nxPreset = require('@nrwl/jest/preset');
const iconModule = 'react-native-vector-icons';
module.exports = {
  ...nxPreset,
  transformIgnorePatterns: [`/node_modules/(?!${iconModule})`],
  coverageReporters: ['lcov'],
};
