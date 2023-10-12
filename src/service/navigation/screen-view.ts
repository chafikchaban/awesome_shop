import { BackHandler, NativeEventSubscription } from 'react-native';
import { Route as NavigationRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { IView, IViewModel, ViewContainer } from '../../arch/view';
import { IRouteParams, Route } from './model';

export interface IScreenVM extends IViewModel {
  onFocus?(): void;
  onBlur?(): void;
  onHardwareBack?(): void;
}

export type IScreenView<VM extends IScreenVM> = IView<VM>;

// TODO: Extend everything from ScreenViewContainer and remove.
export interface ScreenProps<RP extends IRouteParams = object> {
  navigation: NativeStackNavigationProp<any, any>;
  route: NavigationRoute<Route, RP>;
}

export abstract class ScreenViewContainer<VM extends IScreenVM, RP extends IRouteParams = {}> extends ViewContainer<VM, ScreenProps<RP>> {

  private removeFocusSubscription?: Function;
  private removeBlurSubscription?: Function;
  private hardwareBackSubscription?: NativeEventSubscription;

  public componentDidMount(): void {
    super.componentDidMount?.();

    this.props.navigation.addListener('focus', () => this.onFocus());
    this.props.navigation.addListener('blur', () => this.onBlur());
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount?.();

    this.removeFocusSubscription?.();
    this.removeBlurSubscription?.();
  }

  protected onFocus(): void {
    this.vm.onFocus?.();
    this.hardwareBackSubscription = BackHandler.addEventListener('hardwareBackPress', () => this.onHardwareBack());
  }

  protected onBlur(): void {
    this.vm.onBlur?.();
    this.hardwareBackSubscription?.remove();
  }

  protected onHardwareBack(): boolean {
    if (this.vm.onHardwareBack) {
      this.vm.onHardwareBack();

      return true;
    }

    return false;
  }

  protected get routeParams(): Readonly<RP> {
    return this.props.route.params ?? {} as RP;
  }
}
