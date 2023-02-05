import { CSSProperties, FC, PropsWithChildren } from 'react';
import { GridRowBalancerProps, GridRowBalancerContextValue } from './types';
import { createProvider } from '../../utils';
import { CONTEXT_NAME, gridRowBalancerContextValueDefault } from './constants';
import classes from './styles/index.module.css';

const [Provider, useGridRowBalancer] =
  createProvider<GridRowBalancerContextValue>({
    contextName: CONTEXT_NAME,
    contextDefaultValue: gridRowBalancerContextValueDefault,
  });

const GridRowBalancer: FC<PropsWithChildren<GridRowBalancerProps>> = ({
  children,
  columns,
  elementRows,
}) => {
  const styleVariables = {
    '--grid-column': columns,
  } as CSSProperties;

  return (
    <Provider value={{ columns, elementRows }}>
      <div className={classes.gridRowBalancer} style={styleVariables}>
        {children}
      </div>
    </Provider>
  );
};

export { GridRowBalancer, useGridRowBalancer };
