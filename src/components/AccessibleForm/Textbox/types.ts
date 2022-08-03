import { TextboxProps } from '../../Form/Textbox';
import { AccessibleLabelProps } from '../Label';

export type AccessibleTextboxProps =
    Omit<TextboxProps, 'id' | 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'>
    & Pick<AccessibleLabelProps, 'label'>
    & {
        errorMessage?: string;
        isDescriptionHidden?: boolean;
    };