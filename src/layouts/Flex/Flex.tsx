import { FlexProps } from './types';

import classes from './styles/index.module.css';

export const Flex = ({ children }: FlexProps) => {
  return <div className={classes.flex}>{children}</div>;
};
