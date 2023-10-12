module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    // Support TS path aliasing
    'tsconfig-paths-module-resolver',

    // Resolve Flow properties being stripped from thirdparty packages
    // https://github.com/facebook/react-native/issues/29084#issuecomment-1030732709
    '@babel/plugin-transform-flow-strip-types',

    // Support TS `experimenatlDecorators`
    // https://github.com/leonardfactory/babel-plugin-transform-typescript-metadata#usage
    // https://github.com/tc39/proposal-decorators#comparison-with-typescript-experimental-decorators
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],

    // https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation
    'react-native-reanimated/plugin',
  ],
};