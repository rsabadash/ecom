import { Control, Path } from 'react-hook-form';
import { InputAdapterProps } from '../InputAdapter';
import { Language, TranslateFn } from '../../IntlProvider';

export type MultiLanguageInputAdapterProps<FormValues> =
    Omit<InputAdapterProps<FormValues>, 'onChange' | 'onBlur' | 'value' | 'name' | 'isValid' | 'isDescriptionHidden'>
    & {
        isRequiredAllLanguage?: boolean;
        name: Path<FormValues>,
        control: Control<FormValues>;
    };

export type GetPlaceholderArgs = {
    placeholder: undefined | string;
    language: Language;
    translate: TranslateFn;
};

export type GetPlaceholderReturn = undefined | string;