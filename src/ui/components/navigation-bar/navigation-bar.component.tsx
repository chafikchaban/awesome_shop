import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, LayoutProps } from '@ui-kitten/components';
import { FalsyFC, RenderProp } from '@ui-kitten/components/devsupport';

import { Shadow } from '@components/shadow.component';

import { NavigationBarActionProps } from './navigation-bar-action.component';

export interface NavigationBarProps extends LayoutProps {
  accessoryLeft?: RenderProp<NavigationBarActionProps>;
  accessoryRight?: RenderProp<NavigationBarActionProps>;
}

export const NavigationBar: React.FC<NavigationBarProps> = (props) => {

  return (
    <Shadow>
      <Layout style={[styles.container, props.style]}>
        <FalsyFC
          style={styles.action}
          status={props.appearance}
          component={(props.accessoryLeft) as RenderProp<any>}
        />
        {props.children}
        <FalsyFC
          style={styles.action}
          status={props.appearance}
          component={(props.accessoryRight) as RenderProp<any>}
        />
      </Layout>
    </Shadow>
  );
};

NavigationBar.defaultProps = {
  appearance: 'basic',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    zIndex: 1,
  },
  action: {
    marginHorizontal: 8,
    paddingHorizontal: 8,
  },
});
