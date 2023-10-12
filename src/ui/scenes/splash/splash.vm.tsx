import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

import { navigationService } from '../../../service/navigation/navigation.service';
import { ISplashVM } from './splash.component';

export class SplashVM implements ISplashVM {

  public startSession = (): Promise<void> => {
    return this.checkConnectivity().then(online => {
      if (!online) {
        console.error('no internet');

        return this.presentNetworkBlocker();
      }

      return this.enterApp();
    });
  };

  private enterApp = (): void => {
    navigationService.goTo('/app');
  };

  private presentNetworkBlocker = (): void => {
    // no-op
  };

  public checkConnectivity = (retryAmount: number = 0, attempt = 0): Promise<boolean> => {
    if (attempt > retryAmount) {
      return Promise.resolve(false);
    }

    return NetInfo.fetch().then((state: NetInfoState) => {
      if (state.isInternetReachable) {
        return true;
      }

      return new Promise(resolve => {
        return setTimeout(() => this.checkConnectivity(retryAmount, attempt + 1).then(resolve), 1000);
      });
    });
  };
}
