import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { R } from '../../../assets';
import { BackIcon, SettingsOutlineIcon } from '../icons';
import { NavigationBarAction, NavigationBarActionProps } from './navigation-bar-action.component';

export const None: React.FC<NavigationBarActionProps> = (props) => (
  <NavigationBarAction
    {...props}
    style={[props.style, { backgroundColor: 'transparent', borderColor: 'transparent' }]}
  />
);

export const BackAction: React.FC<NavigationBarActionProps> = (props) => {
  const navigation = useNavigation();

  return (
    <NavigationBarAction
      accessoryLeft={BackIcon}
      onPress={navigation.goBack}
      {...props}
    />
  );
};

export const NavigationBarMenu: React.FC<ViewProps> = (props) => {

  const renderAction = (actionElement: React.ReactElement, index: number): React.ReactElement => {
    return React.cloneElement(actionElement, {
      ...actionElement.props,
      key: index,
      style: [{ marginHorizontal: 4 }, actionElement.props.style],
    });
  };

  return (
    <View
      {...props}
      style={[props.style, styles.menuAction]}>
      {React.Children.map(props.children as [], renderAction)}
    </View>
  );
};

export const EditAction: React.FC<NavigationBarActionProps> = (props) => (
  <NavigationBarAction {...props}>
    {R.strings.edit}
  </NavigationBarAction>
);

export const SettingsAction: React.FC<NavigationBarActionProps> = (props) => (
  <NavigationBarAction
    {...props}
    accessoryLeft={SettingsOutlineIcon}
  />
);

export const SaveAction: React.FC<NavigationBarActionProps> = (props) => (
  <NavigationBarAction {...props}>
    {props.children || R.strings.save}
  </NavigationBarAction>
);

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  emptyAction: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  menuAction: {
    flexDirection: 'row',
    marginHorizontal: 4,
  },
  animalsAction: {
    flexDirection: 'row-reverse',
  },
});
