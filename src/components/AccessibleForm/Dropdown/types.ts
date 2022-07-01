import { DropdownProps, DropdownValue } from '../../Form/Dropdown';
import { AccessibleLabelProps } from '../Label';
import { Language, Translation } from '../../IntlProvider';

export type AccessibleDropdownProps =
    Omit<DropdownProps, 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'> &
    Pick<AccessibleLabelProps, 'label'> &
    {
        readOnly?: boolean
    };

export type GetReadOnlyValueArgs = {
    value: undefined | DropdownValue | Translation | Translation[];
    language: Language;
};