import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { DEFAULT_BUTTON_VARIANT, DEFAULT_BUTTON_SIZE, DEFAULT_BUTTON_TYPE } from './constants';
import { ButtonProps } from './types';
import classes from './styles/index.module.css';

const Button: FC<PropsWithChildren<ButtonProps>> = (
    {
        type = DEFAULT_BUTTON_TYPE,
        size = DEFAULT_BUTTON_SIZE,
        variant = DEFAULT_BUTTON_VARIANT,
        disabled,
        children,
        onClick
    }
) => {
    const handleButtonClick = (): void => {
        if (disabled) {
            return;
        }

        onClick && onClick();
    }

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={handleButtonClick}
            className={clsx(classes.button, classes[`button_${size}`], classes[`button_${variant}`])}
        >
            {children}
        </button>
    );
};

export default Button;