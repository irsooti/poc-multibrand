import { FC } from 'react';
import { createSpecializatedComponents } from '../specialization';

const SpecificComponent = createSpecializatedComponents({
  vans: './BrandComponent/VansComponent',
  dickies: './BrandComponent/DickiesComponent',
  default: './BrandComponent/DefaultComponent',
});

const BrandComponent: FC<{
  shirts: string[];
  pants: string[];
  socks: string[];
}> = ({ children, ...props }) => {
  // ? example
  // ? const {vansProps, defaultProps} = useSpecificBrandLogic(/* some props */)
  const { pants, ...commonProps } = { ...props };

  return (
    <SpecificComponent
      default={commonProps}
      vans={{ pants, ...commonProps }}
      dickies={commonProps}
      fallback={null}
    >
      {children}
    </SpecificComponent>
  );
};

export default BrandComponent;
