import { ScreenViewContainer } from '@service/navigation/screen-view';

import { IView } from '../../../arch/view';
import { Home, IHomeVM } from './home.component';
import { HomeVM } from './home.vm';

interface RouteParams {

}

export class HomeContainer extends ScreenViewContainer<IHomeVM, RouteParams> {

  protected vm: IHomeVM = new HomeVM();

  protected get view(): IView<IHomeVM> {
    return Home;
  }
}
