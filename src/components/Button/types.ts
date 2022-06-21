import { buttonSize, buttonType, buttonVariant } from './constants';

export type ButtonProps = {
    type?: ValuesOfObject<typeof buttonType>;
    size?: ValuesOfObject<typeof buttonSize>;
    variant?: ValuesOfObject<typeof buttonVariant>;
    disabled?: boolean;
    onClick?: () => void;
};