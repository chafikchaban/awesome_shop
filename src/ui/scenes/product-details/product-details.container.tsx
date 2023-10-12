import { ScreenViewContainer } from '@service/navigation/screen-view';

import { IView } from '../../../arch/view';
import { IProductDetailsVM, ProductDetails } from './product-details.component';
import { ProductDetailsVM } from './product-details.vm';

interface RouteParams {
  productId: number;
}

export class ProductDetailsContainer extends ScreenViewContainer<IProductDetailsVM, RouteParams> {

  protected vm: IProductDetailsVM = new ProductDetailsVM(this.routeParams.productId);

  protected get view(): IView<IProductDetailsVM> {

    return ProductDetails;
  }
}
