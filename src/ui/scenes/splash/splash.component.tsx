import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { observer } from 'mobx-react';
import { IView, IViewModel } from 'src/arch/view';

import { Loading } from '@components/loading/loading.component';

export interface ISplashVM extends IViewModel {
  // animation: ISplashAnimation;
  startSession(): Promise<void>;
}

export interface ISplashAnimation {
  lottieJson: string;
  playTillIntermediate(ref: LottieView): Promise<void>;
  finish(ref: LottieView): Promise<void>;
}

export const Splash: IView<ISplashVM> = observer(({ vm }) => {

  React.useEffect(() => {
    setTimeout(vm.startSession, 2000);
  }, []);

  return (
    <View style={styles.safeArea}>
      <Loading style={styles.animation} />
    </View>

  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  animation: {
    width: 500,
    height: 500,
  },
});

