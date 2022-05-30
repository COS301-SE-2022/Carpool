module.exports = {
  displayName: 'client-shared-utilities',
  preset: '../../../../jest.preset.ts',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/client/shared/utilities',
};
