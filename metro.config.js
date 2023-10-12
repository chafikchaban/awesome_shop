const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@eva-design/eva',
  customMappingPath: 'src/app/mapping.json',
};

module.exports = mergeConfig(getDefaultConfig(__dirname), MetroConfig.create(evaConfig));
