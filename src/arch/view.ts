import React from 'react';

export interface IViewModel {
  onMount?(): void;
  onUnmount?(): void;
}

export type IView<VM extends IViewModel> = React.ComponentType<{ vm: VM }>;

export abstract class ViewContainer<VM extends IViewModel, Props = {}> extends React.Component<Props> {

  protected abstract vm: VM;

  protected abstract get view(): IView<VM>;

  public componentDidMount(): void {
    this.vm.onMount?.();
  }

  public componentWillUnmount(): void {
    this.vm.onUnmount?.();
  }

  public render(): React.ReactElement {
    return React.createElement(this.view, { vm: this.vm });
  }
}
