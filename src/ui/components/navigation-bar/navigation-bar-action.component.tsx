import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonProps } from '@ui-kitten/components';
import { FalsyFC, FalsyText } from '@ui-kitten/components/devsupport';

export type NavigationBarActionProps = ButtonProps;

export const NavigationBarAction: React.FC<NavigationBarActionProps> = (props) => {

  const accessoryLeft = (accessoryProps): React.ReactElement => (
    <FalsyFC
      {...accessoryProps}
      style={[accessoryProps.style, styles.accessory]}
      component={props.accessoryLeft}
    />
  );

  const accessoryRight = (accessoryProps): React.ReactElement => (
    <FalsyFC
      {...accessoryProps}
      style={[accessoryProps.style, styles.accessory]}
      component={props.accessoryRight}
    />
  );

  const title = (titleProps): React.ReactElement => (
    <FalsyText
      {...titleProps}
      style={[titleProps.style, styles.title]}
      component={props.children}
    />
  );

  return (
    <Button
      appearance='ghost'
      status='basic'
      {...props}
      style={[styles.container, props.style]}
      accessoryLeft={accessoryLeft}
      accessoryRight={accessoryRight}>
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 0,
    minWidth: 0,
  },
  title: {
    marginHorizontal: 0,
  },
  accessory: {
    marginHorizontal: 0,
  },
});
