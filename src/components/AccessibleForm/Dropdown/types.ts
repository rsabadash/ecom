import { DropdownProps } from '../../Form/Dropdown';
import { AccessibleLabelProps } from '../Label';

export type AccessibleDropdownProps =
    Omit<DropdownProps, 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'>
    & Pick<AccessibleLabelProps, 'label'>
    & {
        errorMessage?: string;
        isDescriptionHidden?: boolean;
    };