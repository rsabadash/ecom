import { useTranslation } from '../../components/IntlProvider';
import { Top, TopHeading } from '../../layouts/Top';
import { SettingsPersonalization } from './SettingsPersonalization';

const Settings = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('settings')}</TopHeading>
      </Top>
      <SettingsPersonalization />
    </>
  );
};

export default Settings;
