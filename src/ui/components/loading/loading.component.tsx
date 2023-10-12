import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

export const Loading: React.FC<ViewProps> = (props) => (
  <View
    {...props}
    style={[StyleSheet.absoluteFill, styles.container]}>
    <AnimatedLottieView
      style={[styles.lottieView, props.style]}
      autoPlay={true}
      source={require('./splash-animation.json')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: 250,
    height: 250,
  },
});
