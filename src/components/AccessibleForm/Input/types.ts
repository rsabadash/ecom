import { InputProps } from '../../Form/Input';
import { AccessibleLabelProps } from '../Label';

export type AccessibleInputProps =
    Omit<InputProps, 'id' | 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'>
    & Pick<AccessibleLabelProps, 'label'>
    & {
        errorMessage?: string;
        isDescriptionHidden?: boolean;
    };