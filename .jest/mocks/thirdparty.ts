jest.doMock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

jest.doMock('react-native-orientation-locker', () => ({
  lockToPortrait: jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => require('@react-native-community/netinfo/jest/netinfo-mock'));
require('react-native-reanimated').setUpTests();
require('react-native-gesture-handler/jestSetup');
