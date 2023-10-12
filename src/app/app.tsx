import React from 'react';
import { EmitterSubscription, NativeEventSubscription } from 'react-native';

import { navigationService } from '@service/navigation/navigation.service';

import { AppUI } from './app-ui';

export class App extends React.Component {

  private appStateSubscription?: NativeEventSubscription;
  private shakeEventSubscription?: EmitterSubscription;

  public componentWillUnmount(): void {
    this.appStateSubscription?.remove();
    this.shakeEventSubscription?.remove();
  }

  public render(): React.ReactNode {
    return (
      <AppUI>
        {navigationService.navigator({})}
      </AppUI>
    );
  }
}

