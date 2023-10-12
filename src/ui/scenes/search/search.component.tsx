import React from 'react';
import { ListRenderItemInfo, RefreshControl, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { Input, Layout, List } from '@ui-kitten/components';
import { IView, IViewModel } from 'src/arch/view';

import { IProductCardVM, ProductCard } from '@scenes/home/components/product-card.component';
import { SearchIcon } from '@components/icons';
import { Loading } from '@components/loading/loading.component';

import { DataView, DataViewState } from '../../components/data-view.component';
import { BackAction, NavigationBar } from '../../components/navigation-bar';

export interface ISearchVM extends IViewModel {
  query: string;
  loading: boolean;
  hasMore: boolean;
  refreshing: boolean;
  loadingNext: boolean;
  products: Array<IProductCardVM>;
  refresh(): void;
  fetchMore(): void;
  search(query: string): void;
}

export const Search: IView<ISearchVM> = observer(({ vm }) => {

  const renderCard = ({ item, index }: ListRenderItemInfo<IProductCardVM>): React.ReactElement | null => (
    <ProductCard
      key={index}
      {...item}
    />
  );

  const renderSearchInput = React.useCallback((): React.ReactElement => (
    <Input
      style={styles.searchInput}
      placeholder='search'
      accessoryLeft={SearchIcon as any}
      onChangeText={vm.search}
      value={vm.query}
    />
  ), [vm.query]);

  const renderNavigationBar = React.useCallback((): React.ReactElement => {
    return (
      <NavigationBar
        accessoryLeft={BackAction as any}
        accessoryRight={renderSearchInput}
      />
    );
  }, []);

  const renderRefreshControl = React.useCallback(() => (
    <RefreshControl
      refreshing={vm.refreshing}
      onRefresh={vm.refresh}
    />
  ), [vm.refresh, vm.refreshing]);

  const renderLoadingMore = React.useCallback((): React.ReactElement | null => {
    if (!vm.loadingNext) {
      return null;
    }

    return (
      <Loading />
    );
  }, [vm.loadingNext]);

  return (
    <Layout style={styles.safeArea}>
      {renderNavigationBar()}
      <DataView state={vm.loading ? DataViewState.LOADING : DataViewState.DATA}>
        <List
          contentContainerStyle={styles.contentContainer}
          data={vm.products}
          renderItem={renderCard}
          numColumns={2}
          removeClippedSubviews={true}
          onEndReached={vm.fetchMore}
          refreshControl={renderRefreshControl()}
          ListFooterComponent={renderLoadingMore()}
        />
      </DataView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 48,
    alignItems: 'center',
  },
  label: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  cardsContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  searchInput: {
    marginHorizontal: 16,
    borderRadius: 16,
    flexGrow: 1,
  },
});

