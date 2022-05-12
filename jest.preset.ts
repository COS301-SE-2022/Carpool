let nxPreset = require('@nrwl/jest/preset');
nxPreset.transform = {
  '^.+\\.(ts|js|html)$|@react-native|react-native': 'ts-jest',
};
module.exports = { ...nxPreset };
