import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, Layout } from '@ui-kitten/components';

import { SearchIcon } from '@components/icons';

export interface HomeNavigationBarProps {
  search(query: string): void;
}

export const HomeNavigationBar: React.FC<HomeNavigationBarProps> = ({ search }) => {

  const renderSearchInput = React.useCallback(() => (
    <Input
      testID='@home/input'
      style={styles.searchInput}
      placeholder='search'
      accessoryLeft={SearchIcon as any}
      onSubmitEditing={({ nativeEvent: { text } }) => search(text)}
    />
  ), []);

  return (
    <Layout
      style={styles.container}>
      {renderSearchInput()}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 16,
  },
});
