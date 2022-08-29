import { FC } from 'react';
import clsx from 'clsx';
import { DescriptionProps } from './types';
import { typeToAriaLiveMapper } from './constatns';
import classes from './styles/index.module.css';

const Description: FC<DescriptionProps> = (
    {
        id,
        type,
        message,
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

    const ariaLiveType = type && typeToAriaLiveMapper[type] ? typeToAriaLiveMapper[type] : typeToAriaLiveMapper.default;

    return (
        <div id={id} className={descriptionClassNames} aria-live={ariaLiveType}>
            {message}
        </div>
    )
};

export default Description;