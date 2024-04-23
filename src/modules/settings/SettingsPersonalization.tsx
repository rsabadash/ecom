import { Heading } from '../../components/Heading';
import { useTranslation } from '../../components/IntlProvider';
import { FlexWrapper } from '../../layouts/Flex';
import { SectionForeground } from '../../layouts/Section';
import { PERSONALIZATION_SETTINGS_ID } from './constants';
import { SettingsLanguage } from './SettingsLanguage';
import { SettingsTheme } from './SettingsTheme';

export const SettingsPersonalization = () => {
  const { translate } = useTranslation();

  return (
    <SectionForeground sectionLabeledBy={PERSONALIZATION_SETTINGS_ID}>
      <FlexWrapper>
        <Heading id={PERSONALIZATION_SETTINGS_ID} level={2} fontSize={4}>
          {translate('settings.personalization')}
        </Heading>
        <SettingsLanguage />
        <SettingsTheme />
      </FlexWrapper>
    </SectionForeground>
  );
};
