import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider } from '@ui-kitten/components';
import { FalsyText } from '@ui-kitten/components/devsupport';

import { R } from '../../../assets';
import { NavigationBar, NavigationBarAction, NavigationBarProps } from '.';

export interface ModalNavigationBarProps extends NavigationBarProps {
  onRequestClose?(): void;
}

export const ModalNavigationBar: React.FC<ModalNavigationBarProps> = ({ title, onRequestClose, ...props }) => {

  const renderTitle = (titleProps): React.ReactElement => (
    <FalsyText
      {...titleProps}
      style={[titleProps.style, styles.title]}
      category='h6'
      numberOfLines={1}
      component={title}
    />
  );

  const renderCancelAction = (actionProps): React.ReactElement => (
    <NavigationBarAction
      {...actionProps}
      onPress={() => onRequestClose?.()}>
      {R.strings.cancel}
    </NavigationBarAction>
  );

  return (
    <>
      <NavigationBar
        accessoryLeft={renderTitle}
        accessoryRight={renderCancelAction}
        {...props}
      />
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    flexBasis: 256,
  },
});
