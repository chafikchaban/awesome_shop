import React from 'react';
import { ListRenderItemInfo, RefreshControl, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { Layout, List } from '@ui-kitten/components';
import { IViewModel } from 'src/arch/view';

import { IScreenView } from '@service/navigation/screen-view';
import { Loading } from '@components/loading/loading.component';

import { DataView, DataViewState } from '../../components/data-view.component';
import { EmptyList } from './components/empty-list.component';
import { HomeNavigationBar, HomeNavigationBarProps } from './components/navigation-bar.component';
import { IProductCardVM, ProductCard } from './components/product-card.component';

export interface IHomeVM extends IViewModel, HomeNavigationBarProps {
  loading: boolean;
  refreshing: boolean;
  loadingNext: boolean;
  products: Array<IProductCardVM>;
  hasMore: boolean;
  fetchMore(): void;
  refresh(): void;
}

export const Home: IScreenView<IHomeVM> = observer(({ vm }) => {

  const renderCard = React.useCallback(({ item, index }: ListRenderItemInfo<IProductCardVM>): React.ReactElement | null => (
    <ProductCard
      key={index}
      testID='@home/product-card'
      {...item}
    />
  ), []);

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

  const renderList = React.useCallback(() => {
    if (vm.loading) {
      return null;
    }

    return (
      <List
        contentContainerStyle={styles.contentContainer}
        data={vm.products}
        renderItem={renderCard}
        numColumns={2}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        onEndReached={vm.fetchMore}
        refreshControl={renderRefreshControl()}
        ListFooterComponent={renderLoadingMore()}
        ListEmptyComponent={EmptyList}
        onRefresh={vm.refresh}
        refreshing={vm.refreshing}
      />
    );
  }, [vm.products, vm.loading, vm.refreshing]);

  return (
    <Layout style={styles.safeArea}>
      <HomeNavigationBar
        search={vm.search}
      />
      <DataView state={vm.loading ? DataViewState.LOADING : DataViewState.DATA}>
        {renderList()}
      </DataView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    flex: 1,
    textAlign: 'center',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 16,
  },
});

