import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, LayoutProps, TextProps } from '@ui-kitten/components';
import { FalsyText, RenderProp } from '@ui-kitten/components/devsupport';

import { R } from '../../assets';

export interface FullScreenErrorProps extends React.PropsWithChildren<LayoutProps> {
  message?: React.ReactText | RenderProp<TextProps>;
}

export const FullScreenError: React.FC<FullScreenErrorProps> = ({ message, children, ...props }) => (
  <Layout
    {...props}
    style={[styles.container, props.style]}>
    <FalsyText
      category='h6'
      component={message}
    />
    {children}
  </Layout>
);

FullScreenError.defaultProps = {
  message: R.strings.cancel,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
