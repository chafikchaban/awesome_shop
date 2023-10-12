import React from 'react';
import { Icon, IconProps } from '@ui-kitten/components';

export const BackIcon: React.FC<IconProps> = (props) => (
  <Icon
    {...props}
    name='arrow-back'
  />
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <Icon
    {...props}
    name='search'
  />
);

export const PlusIcon: React.FC<IconProps> = (props) => (
  <Icon
    {...props}
    name='plus'
  />
);
