import { isShallowEqualObjects } from '@wordpress/is-shallow-equal';
import { FC, lazy, memo, Suspense, SuspenseProps } from 'react';

type ComponentProps = FC<
  { fallback?: SuspenseProps['fallback']; default: any } & Partial<{
    [key in typeof process.env.REACT_APP_BRAND]: {
      fallback: SuspenseProps['fallback'];
    } & any;
  }>
>;

const createLazy = (
  props: { default: string } & Partial<{
    [key in typeof process.env.REACT_APP_BRAND]: string;
  }>
) => {
  return lazy(() => {
    if (!props[process.env.REACT_APP_BRAND]) {
      return import(`${props.default}`);
    }
    return import(`${props[process.env.REACT_APP_BRAND]}`);
  });
};

function createComponent<T>(
  Component: React.LazyExoticComponent<React.ComponentType<T>>,
  isDefault: boolean
): ComponentProps {
  const specializationKey = isDefault ? 'default' : process.env.REACT_APP_BRAND;
  
  const SpecializationComponent: ComponentProps = ({
    children,
    fallback = null,
    ...props
  }) => {
    const currentProps = props[specializationKey];

    return (
      <Suspense fallback={fallback}>
        <Component {...currentProps}>{children}</Component>
      </Suspense>
    );
  };

  return memo(SpecializationComponent, (prevProps, nextProps) => {
    return isShallowEqualObjects(
      prevProps[specializationKey],
      nextProps[specializationKey]
    );
  });
}

export function createSpecializatedComponents(
  specializedComponentsPaths: { default: string } & Partial<{
    [key in typeof process.env.REACT_APP_BRAND]: string;
  }>
) {
  const Component = createLazy(specializedComponentsPaths);
  const hasBrand = process.env.REACT_APP_BRAND in specializedComponentsPaths;

  return createComponent(Component, !hasBrand);
}
