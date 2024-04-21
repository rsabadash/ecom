import { useTranslation } from '../../components/IntlProvider';
import { SectionForeground } from '../../layouts/Section';
import { Top, TopHeading } from '../../layouts/Top';
import { SettingsLanguage } from './SettingsLanguage';

const Settings = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('settings')}</TopHeading>
      </Top>
      <SectionForeground>
        <SettingsLanguage />
      </SectionForeground>
    </>
  );
};

export default Settings;
