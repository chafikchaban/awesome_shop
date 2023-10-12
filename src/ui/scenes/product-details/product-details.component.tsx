import React from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import { Layout, Text } from '@ui-kitten/components';
import { IView, IViewModel } from 'src/arch/view';

import { DataView, DataViewState } from '../../components/data-view.component';
import { BackAction, NavigationBar } from '../../components/navigation-bar';
import { ImageSwiper } from './components/image-swiper.component';
import { ProductRating } from './components/product-rating.component';

export interface IProductDetailsVM extends IViewModel {
  loading: boolean;
  title: string;
  description: string;
  price: string;
  discount: string;
  category: string;
  brand: string;
  rating: number;
  images: Array<ImageSourcePropType>;
}

export const ProductDetails: IView<IProductDetailsVM> = observer(({ vm }) => {

  return (
    <Layout style={styles.container}>
      <NavigationBar accessoryLeft={BackAction as any}>
        <Text
          category='h6'
          style={styles.navigationBarTitle}>
          {vm.title}
        </Text>
      </NavigationBar>
      <DataView state={vm.loading ? DataViewState.LOADING : DataViewState.DATA}>
        <ImageSwiper images={vm.images} />
        <View style={styles.bottomSection}>
          <View style={styles.titleContainer}>
            <Text
              style={styles.title}
              category='h4'>
              {vm.title}
            </Text>
            <ProductRating
              style={styles.rating}
              rating={vm.rating}
            />
          </View>
          <View style={styles.row}>
            <Text
              status='primary'
              category='h5'>
              {vm.price}
            </Text>
            <Text
              category='p1'>
              {vm.discount}
            </Text>
          </View>
          <View style={styles.row}>
            <View style={[styles.tag, styles.brandTag]}>
              <Text
                style={styles.brandName}
                numberOfLines={1}
                category='c2'>
                {vm.brand}
              </Text>
            </View>
            <View style={[styles.tag, styles.categoryTag]}>
              <Text
                numberOfLines={1}
                category='c2'>
                {vm.category}
              </Text>
            </View>
          </View>
          <Text category='p2'>
            {vm.description}
          </Text>
        </View>
      </DataView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationBarTitle: {
    flex: 1,
    textAlign: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'left',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    gap: 16,
  },
  bottomSection: {
    flex: 0.7,
    paddingHorizontal: 16,
    gap: 8,
  },
  tag: {
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  rating: {
    flex: 0.2,
  },
  categoryTag: {
    backgroundColor: '#f3f3f3',
  },
  brandTag: {
    backgroundColor: '#46649F',
  },
  brandName: {
    color: '#fff',
  },
});

