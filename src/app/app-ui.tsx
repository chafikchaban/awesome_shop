import React from 'react';
import { Platform, StyleSheet, UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { default as theme } from './theme.json';

export interface AppUIProps {
  children?: React.ReactNode;
}

export const AppUI: React.FC<AppUIProps> = ({ children }) => {

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental?.(true);
    }
    Orientation.lockToPortrait();
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaProvider>
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.light, ...theme }}>
          <GestureHandlerRootView style={StyleSheet.absoluteFill}>
            {children}
          </GestureHandlerRootView>
        </ApplicationProvider>
      </SafeAreaProvider>
    </>
  );
};
