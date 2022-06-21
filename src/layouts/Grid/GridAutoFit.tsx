import { CSSProperties, FC, PropsWithChildren } from 'react';
import { SimpleGridProps } from './types';
import classes from './styles/index.module.css';

const GridAutoFit: FC<PropsWithChildren<SimpleGridProps>> = (
    {
        children,
        gridColumnMinWidth = 320
    }
) => {
    const styleVariables = { '--grid-column-min-width': `${gridColumnMinWidth}px` } as CSSProperties;

    return (
        <div className={classes.gridAutoFit} style={styleVariables}>
            {children}
        </div>
    );
};

export { GridAutoFit };