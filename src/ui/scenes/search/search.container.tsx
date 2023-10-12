import { ScreenViewContainer } from '@service/navigation/screen-view';

import { IView } from '../../../arch/view';
import { ISearchVM, Search } from './search.component';
import { SearchVM } from './search.vm';

interface RouteParams {
  query: string;
}

export class SearchContainer extends ScreenViewContainer<ISearchVM, RouteParams> {

  protected vm: ISearchVM = new SearchVM(this.routeParams.query);

  protected get view(): IView<ISearchVM> {

    return Search;
  }
}
