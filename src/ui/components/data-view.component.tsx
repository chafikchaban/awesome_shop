import React from 'react';

import { FullScreenError } from './full-screen-error.component';
import { Loading } from './loading/loading.component';

export enum DataViewState {
  NONE = 'none',
  DATA = 'data',
  LOADING = 'loading',
  REFRESHING = 'refreshing',
  EMPTY = 'empty',
  ERROR = 'error'
}

type DataViewProps = React.PropsWithChildren<{
  state?: Falsy<DataViewState>;
  renderLoading?: React.FC<DataViewRenderProps>;
  renderEmpty?: React.FC<DataViewRenderProps>;
  renderError?: React.FC<DataViewRenderProps>;
}>;

export interface DataViewRenderProps {
  prevState: DataViewState;
  state: DataViewState;
}

export const DataView: React.FC<DataViewProps> = ({ state, ...props }) => {

  const prevStateRef = React.useRef<DataViewState>(state || DataViewState.NONE);

  switch (state) {
    case DataViewState.DATA: {
      prevStateRef.current = DataViewState.DATA;

      return (props.children as React.ReactElement) || null;
    }

    case DataViewState.REFRESHING: {
      prevStateRef.current = DataViewState.REFRESHING;

      return (props.children as React.ReactElement) || null;
    }

    case DataViewState.LOADING: {
      const prevState = prevStateRef.current;
      prevStateRef.current = DataViewState.LOADING;

      return (props.renderLoading?.({ prevState, state })) || null;

    }

    case DataViewState.EMPTY: {
      const prevState = prevStateRef.current;
      prevStateRef.current = DataViewState.EMPTY;

      return (props.renderEmpty?.({ prevState, state })) || null;
    }

    case DataViewState.ERROR: {
      const prevState = prevStateRef.current;
      prevStateRef.current = DataViewState.ERROR;

      return (props.renderError?.({ prevState, state })) || null;
    }

    default:
      return null;
  }
};

DataView.defaultProps = {
  state: DataViewState.NONE,
  renderLoading: (_props: DataViewRenderProps): React.ReactElement => {
    return <Loading />;
  },
  renderError: (_props: DataViewRenderProps): React.ReactElement => (
    <FullScreenError />
  ),
};
