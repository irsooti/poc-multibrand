import { useEffect } from 'react';
import classes from './VansComponent.module.css';

export const VansComponent = ({ children, ...props }: any) => {
  useEffect(() => {
    console.log('REFRESH');
  });
  return (
    <div className={classes.c}>
      {JSON.stringify(props)}
      {children}
    </div>
  );
};

export default VansComponent;
