import { InputProps } from '../../Form/Input';
import { AccessibleLabelProps } from '../Label';
import { Language, Translation } from '../../IntlProvider';

export type AccessibleInputProps =
    Omit<InputProps, 'id' | 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'> &
    Pick<AccessibleLabelProps, 'label'> &
    {
        readOnly?: boolean
    };

export type GetReadOnlyValueArgs = {
    value: undefined | null | string | Translation;
    language: Language;
};