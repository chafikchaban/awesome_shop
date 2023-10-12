import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';

export const EmptyList: React.FC = () => {

  return (
    <View
      testID='@home/empty-list'
      style={styles.container}>
      <Text category='c1'>
        {'wow, such empty!'}
        {' '}
      </Text>
      <Text category='c2'>
        {'Try refreshing'}
        {' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 16,
  },
});
