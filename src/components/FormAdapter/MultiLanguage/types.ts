import { Control, FieldError, Path } from 'react-hook-form';
import { InputAdapterProps } from '../Input';
import { TextboxAdapterProps } from '../Textbox';
import { Language, TranslateFn } from '../../IntlProvider';

export type MultiLanguageInputAdapterProps<FormValues> =
    Omit<InputAdapterProps<FormValues>, 'onChange' | 'onBlur' | 'value' | 'name' | 'isValid' | 'isDescriptionHidden'>
    & {
        isRequiredAllLanguage?: boolean;
        name: Path<FormValues>,
        control: Control<FormValues>;
    };

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

export type GetErrorMessageArgs = {
    error: FieldError;
    translate: TranslateFn;
};

export type GetErrorMessageReturn = undefined | string;