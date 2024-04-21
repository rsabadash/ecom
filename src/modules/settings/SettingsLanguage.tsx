import { Dropdown } from '../../components/Fields/Dropdown';
import {
  SUPPORTED_LANGUAGES,
  useTranslation,
} from '../../components/IntlProvider';
import { Flex } from '../../layouts/Flex';
import { settingsFields } from './constants';
import { LanguageDropdownItem } from './types';

export const SettingsLanguage = () => {
  const { language, translate, changeLanguage } = useTranslation();

  const dropdownSelectedItem: LanguageDropdownItem = {
    id: language,
    value: translate(`settings.language.${language}`),
  };

  const languagesItems: LanguageDropdownItem[] = SUPPORTED_LANGUAGES.map(
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
    <div>
      <Flex>
        <div>{translate('settings.language')}</div>
        <Dropdown
          isRequired
          size="xs"
          name={settingsFields.language}
          value={dropdownSelectedItem}
          items={languagesItems}
          onChange={onLanguageChange}
        />
      </Flex>
    </div>
  );
};
