import React from 'react';

import { AppRoute } from './navigators/app.navigator';
import { RootRoute } from './navigators/root.navigator';

export interface INavigationService {
  route: INavigationRoute;
  navigator: React.FC<any>;
  goTo(route: Route, params?: IRouteParams): void;
  replace(route: Route, params?: IRouteParams): void;
  goBack(): void;
  reset(): void;
  isValidRoute(value: string): value is Route;
}

export type Route =
  | RootRoute
  | AppRoute;

export interface IRouteParams {
  // stub
}

export interface INavigationRoute {
  name: Route;
  params?: any;
}
