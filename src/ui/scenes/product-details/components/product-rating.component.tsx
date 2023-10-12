import React from 'react';
import { ViewProps } from 'react-native';
import { Rating } from 'react-native-ratings';

export interface IProductRatingProps extends ViewProps {
  rating: number;
}

export const ProductRating: React.FC<IProductRatingProps> = ({ rating, ...props }) => {

  return (
    <Rating
      {...props}
      ratingCount={5}
      startingValue={rating}
      imageSize={16}
      showRating={false}
      readonly={true}
    />
  );
};
