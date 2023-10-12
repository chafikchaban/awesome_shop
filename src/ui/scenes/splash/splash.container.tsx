import { IView, ViewContainer } from '../../../arch/view';
import { ISplashVM, Splash } from './splash.component';
import { SplashVM } from './splash.vm';

interface RouteParams {

}

export class SplashContainer extends ViewContainer<ISplashVM, RouteParams> {

  protected vm: ISplashVM = new SplashVM();

  protected get view(): IView<ISplashVM> {
    return Splash;
  }
}
