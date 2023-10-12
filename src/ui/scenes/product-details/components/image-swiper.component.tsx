import React from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';

export interface IImageSwiperProps {
  images: Array<ImageSourcePropType>;
}

export const ImageSwiper: React.FC<IImageSwiperProps> = ({ images }) => {

  const renderImage = React.useCallback((image: ImageSourcePropType, index: number) => (
    <View
      key={index}
      testID='@product-details/swiper-image'
      style={styles.imageContainer}>
      <FastImage
        style={styles.image}
        source={image as any}
      />
    </View>
  ), []);

  return (
    <Swiper
      autoplay={false}
      loop={true}
      activeDotColor='#F16500'
      removeClippedSubviews={false}>
      {images.map(renderImage)}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
});
