import { FlexWrapperProps } from './types';

import classes from './styles/index.module.css';

export const FlexWrapper = ({ children }: FlexWrapperProps) => {
  return <div className={classes.flexWrapper}>{children}</div>;
};
