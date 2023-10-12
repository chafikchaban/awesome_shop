/**
 * Dependencies that should not be installed during CI.
 * Each dependency should contain `null`ish platform configuration.
 * @see https://github.com/react-native-community/cli/blob/main/docs/dependencies.md#dependency
 */
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: [
    './src/assets/fonts',
    './src/assets/images'
  ]
};
