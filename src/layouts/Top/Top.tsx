import { FC, PropsWithChildren } from 'react';
import Heading from '../../components/Heading';
import { TopProps } from './types';
import classes from './styles/index.module.css';

const Top: FC<PropsWithChildren<TopProps>> = (
    {
        headingText,
        children
    }
) => {
    return (
        <div className={classes.top}>
            <Heading fontSize={3} classNameHeading={classes.top__heading}>{headingText}</Heading>
            <div>{children}</div>
        </div>
    );
};

export default Top;