import React from 'react';
import { Dimensions, ImageSourcePropType, Pressable, PressableProps, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from '@ui-kitten/components';

import { PlusIcon } from '@components/icons';
import { Shadow } from '@components/shadow.component';

export interface IProductCardVM extends PressableProps {
  title: string;
  price: string;
  image: ImageSourcePropType;
  viewDetails(): void;
}

export const ProductCard: React.FC<IProductCardVM> = ({ title, price, image, viewDetails, ...props }) => {

  return (
    <Shadow>
      <Pressable
        {...props}
        onPress={viewDetails}
        style={styles.container}>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={image as any}
          />
        </View>
        <Text
          style={styles.title}
          category='h6'
          numberOfLines={1}
          ellipsizeMode='tail'>
          {title}
        </Text>
        <View style={styles.footer}>
          <Text category='h6'>
            {price}
          </Text>
          <View style={styles.plusButtonContainer}>
            <PlusIcon style={styles.plusIcon} />
          </View>
        </View>
      </Pressable>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: Dimensions.get('window').width * 0.44,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 16,
  },
  imageContainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  plusButtonContainer: {
    borderRadius: 100,
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F16500',
  },
  plusIcon: {
    height: 20,
    aspectRatio: 1.0,
    tintColor: '#fff',
  },
});
