import { Dropdown } from '../../components/Fields/Dropdown';
import { FieldLabel } from '../../components/FormFields/FieldLabel';
import {
  SUPPORTED_LANGUAGES,
  useTranslation,
} from '../../components/IntlProvider';
import { Flex } from '../../layouts/Flex';
import { settingsFields } from './constants';
import { LanguageDropdownItem } from './types';

import classes from './styles/index.module.css';

export const SettingsLanguage = () => {
  const { language, translate, changeLanguage } = useTranslation();

  const dropdownSelectedItem: LanguageDropdownItem = {
    id: language,
    value: translate(`settings.language.${language}`),
  };

  const languageItems: LanguageDropdownItem[] = SUPPORTED_LANGUAGES.map(
    (language) => {
      return {
        id: language,
        value: translate(`settings.language.${language}`),
      };
    },
  );

  const onLanguageChange = (value: LanguageDropdownItem) => {
    const selectedLanguage = value.id;

    changeLanguage(selectedLanguage);
  };

  return (
    <Flex>
      <FieldLabel
        label={translate('settings.language')}
        htmlFor={settingsFields.language}
        size="m"
        fieldLabelClassName={classes.settingsLabel}
      />
      <Dropdown
        isRequired
        size="xs"
        name={settingsFields.language}
        value={dropdownSelectedItem}
        items={languageItems}
        onChange={onLanguageChange}
      />
    </Flex>
  );
};
