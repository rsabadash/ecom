import { Dropdown } from '../../components/Fields/Dropdown';
import { FieldLabel } from '../../components/FormFields/FieldLabel';
import { useTranslation } from '../../components/IntlProvider';
import { useTheme } from '../../components/ThemeProvider';
import { SUPPORTED_THEMES } from '../../components/ThemeProvider/constants';
import { Flex } from '../../layouts/Flex';
import { settingsFields } from './constants';
import { ThemeDropdownItem } from './types';

import classes from './styles/index.module.css';

export const SettingsTheme = () => {
  const { translate } = useTranslation();
  const { theme, switchTheme } = useTheme();

  const dropdownSelectedItem: ThemeDropdownItem = {
    id: theme,
    value: translate(`settings.theme.${theme}`),
  };

  const themesItems: ThemeDropdownItem[] = SUPPORTED_THEMES.map((theme) => {
    return {
      id: theme,
      value: translate(`settings.theme.${theme}`),
    };
  });

  const onThemeChange = () => {
    switchTheme();
  };

  return (
    <Flex>
      <FieldLabel
        label={translate('settings.theme')}
        htmlFor={settingsFields.language}
        size="m"
        fieldLabelClassName={classes.settingsLabel}
      />
      <Dropdown
        isRequired
        size="xs"
        name={settingsFields.language}
        value={dropdownSelectedItem}
        items={themesItems}
        onChange={onThemeChange}
      />
    </Flex>
  );
};
