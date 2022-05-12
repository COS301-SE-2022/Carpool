let nxPreset = require('@nrwl/jest/preset');
nxPreset.transform = {
  '^.+\\.(ts|js|html)$|node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)': 'ts-jest',
};
module.exports = { ...nxPreset };
