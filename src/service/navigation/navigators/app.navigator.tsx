import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeContainer } from '@scenes/home/home.container';
import { ProductDetailsContainer } from '@scenes/product-details/product-details.container';
import { SearchContainer } from '@scenes/search/search.container';

export type AppRoute =
  | '/home'
  | '/product/details'
  | '/search';

export const AppScreens: Record<AppRoute, React.ComponentType<any>> = {
  '/home': HomeContainer,
  '/product/details': ProductDetailsContainer,
  '/search': SearchContainer,
};

const Stack = createNativeStackNavigator();

const createScreen = (name: string, index: number): React.ReactElement => (
  <Stack.Screen
    key={index}
    name={name}
    component={AppScreens[name]}
  />
);

export const AppNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animationTypeForReplace: 'push' }}>
    {Object.keys(AppScreens).map(createScreen)}
  </Stack.Navigator>
);
