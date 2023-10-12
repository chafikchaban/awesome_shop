import React from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';

import { INavigationRoute, INavigationService, IRouteParams, Route } from './model';
import { RootNavigator, RootNavigatorProps } from './navigators/root.navigator';

const NAVIGATION_MAP: Record<string, () => Record<Route, any>> = {
  '/app': () => require('./navigators/app.navigator').AppScreens,
};

class Service implements INavigationService {

  private rootNavigator = React.createRef<NavigationContainerRef<{}>>();

  public route: INavigationRoute = {
    name: '/',
  };

  public get navigator(): React.FC<RootNavigatorProps> {
    return () => React.createElement(RootNavigator, <RootNavigatorProps>{
      ref: this.rootNavigator,
    });
  }

  public goTo = (route: Route, params: IRouteParams = {}): void => {
    const parent = this.findRouteParent(route);
    try {
      // @ts-ignore
      this.rootNavigator.current?.navigate(parent, { screen: route, params });
    } catch {
      console.error(`Unable to navigate to ${route} with ${parent}. Current route ${this.route.name}`);
    }
  };

  public replace = (route: Route, params: IRouteParams = {}): void => {
    const action = StackActions.pop(1);
    this.rootNavigator.current?.dispatch(action);
    this.goTo(route, params);
  };

  public reset = (): void => {
    this.rootNavigator.current?.reset({
      index: 0,
      routes: [{ name: '/auth' }],
    });
  };

  public goBack = (): void => {
    this.rootNavigator.current?.goBack();
  };

  public isValidRoute = (value: string): value is Route => {
    return !!Object.keys(NAVIGATION_MAP).find((navigatorId: string): boolean => {
      const navigatorRoutes: Record<string, string> = NAVIGATION_MAP[navigatorId]();

      return Object.keys(navigatorRoutes).includes(value);
    });
  };

  private findRouteParent = (route: Route): Falsy<string> => {
    return Object.keys(NAVIGATION_MAP).find((navigator) => {
      const navigatorRoutes: string[] = Object.keys(NAVIGATION_MAP[navigator]());

      return [navigator, ...navigatorRoutes].includes(route) && navigator;
    });
  };
}

export const navigationService = new Service();
