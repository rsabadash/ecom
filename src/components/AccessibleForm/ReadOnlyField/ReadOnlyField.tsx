import { FC } from 'react';
import { ReadOnlyFieldProps } from './types';
import classes from './styles/index.module.css';

const ReadOnlyField: FC<ReadOnlyFieldProps> = (
    {
        value
    }
) => {
    return (
        <div className={classes.readOnlyField}>
            {value}
        </div>
    );
};

export default ReadOnlyField;