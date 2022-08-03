import { FC } from 'react';
import clsx from 'clsx';
import { DescriptionProps } from './types';
import classes from './styles/index.module.css';

const Description: FC<DescriptionProps> = (
    {
        message,
        type,
        descriptionClassName
    }
) => {
    const descriptionClassNames = clsx(
        classes.description,
        {
            [classes[`description_${type}`]]: type
        },
        descriptionClassName
    );

    return (
        <div className={descriptionClassNames}>
            {message}
        </div>
    )
};

export default Description;