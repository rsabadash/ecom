import { DropdownItemObject } from '../../components/Fields/Dropdown';
import { Language } from '../../components/IntlProvider';
import { Theme } from '../../components/ThemeProvider';

export type LanguageDropdownItem = DropdownItemObject<
  string,
  Language,
  undefined
>;

export type ThemeDropdownItem = DropdownItemObject<string, Theme, undefined>;
