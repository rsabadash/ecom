import { ReactNode } from 'react';
import { Language } from '../../IntlProvider';
import { DropdownValue } from '../Dropdown';

export type RenderComponentArgs = {
    language: Language;
    languagePostfixName: string;
};

export type MultiLanguageProps = {
    name: string;
    forceExpand?: boolean;
    isInitiallyExpand?: boolean;
    isToggleHidden?: boolean;
    ariaLabel: string;
    ariaControls: string;
    renderComponent: (args: RenderComponentArgs) => ReactNode;
};

export type MultiLanguageItemProps = Pick<MultiLanguageProps, 'name' | 'renderComponent'> & {
    language: Language;
};

export type UseMultiLanguageReturn = {
    language: Language;
    changeLanguage: (value: DropdownValue) => void;
};