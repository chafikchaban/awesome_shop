import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';

export interface DotsLoadingProps extends Omit<AnimatedLottieViewProps, 'source'> {

}

export const DotsLoading = React.forwardRef<LottieView, DotsLoadingProps>((props, ref) => (
  <LottieView
    {...props}
    style={[styles.container, props.style]}
    ref={ref}
    autoPlay={true}
    source={require('./dots-loading.json')}
  />
));

const styles = StyleSheet.create({
  container: {
    height: 108,
  },
});
