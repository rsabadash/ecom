import { Control, Path } from 'react-hook-form';
import { TextboxAdapterProps } from '../TextboxAdapter';
import { Language, TranslateFn } from '../../IntlProvider';

export type MultiLanguageTextboxAdapterProps<FormValues> =
    Omit<TextboxAdapterProps<FormValues>, 'onChange' | 'onBlur' | 'value' | 'name' | 'isValid' | 'isDescriptionHidden'>
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