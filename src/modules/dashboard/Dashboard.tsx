import { useTranslation } from '../../components/IntlProvider';
import { Top, TopHeading } from '../../layouts/Top';

const Dashboard = () => {
  const { translate } = useTranslation();

  return (
    <Top>
      <TopHeading>{translate('dashboard')}</TopHeading>
    </Top>
  );
};

export default Dashboard;
