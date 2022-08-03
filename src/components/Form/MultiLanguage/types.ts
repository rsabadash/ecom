import { ReactNode } from 'react';
import { InputProps } from '../Input';
import { TextboxProps } from '../Textbox';
import { Language } from '../../IntlProvider';
import { DropdownValue } from '../Dropdown';

export type RenderComponentArgs = {
    language: Language;
    languagePostfixName: string;
}

export type MultiLanguageProps = {
    name: string;
    forceOpen?: boolean;
    isReadOnly?: boolean;
    renderComponent: (args: RenderComponentArgs) => ReactNode;
};

export type MultiLanguageItemProps = Pick<MultiLanguageProps, 'name' | 'renderComponent'> & {
    language: Language;
};

export type MultiLanguageInputProps = InputProps;
export type MultiLanguageTextboxProps = TextboxProps;

export type MultiLanguageSwitcherProps = {
    language: Language;
    changeLanguage: (value: DropdownValue) => void;
    supportedLanguages: Language[];
};

export type UseMultiLanguageReturn = {
    language: Language;
    changeLanguage: (value: DropdownValue) => void;
};