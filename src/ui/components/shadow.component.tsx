import React from 'react';
import { ViewProps } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';

interface ShadowProps extends ViewProps {
  disabled?: boolean;
}

export const Shadow: React.FC<ShadowProps> = ({ children, disabled, ...props }) => {

  const styles = useStyleSheet(themedStyles);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (disabled) {
        return child;
      }

      return React.cloneElement(child, { style: [styles.container, child.props.style], ...props });
    }
  });

  return (
    <>
      {childrenWithProps}
    </>
  );
};

export const withShadow = <T extends { style?: any }>(Component: React.FC<T>): React.FC<T> => (props) => {

  const styles = useStyleSheet(themedStyles);

  return (
    <Component
      {...props}
      style={[props.style, styles.container]}
    />
  );
};

const themedStyles = StyleService.create({
  container: {
    shadowColor: 'color-shadow',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 11,
    elevation: 4,
    overflow: 'visible',
  },
});

