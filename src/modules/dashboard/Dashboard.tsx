import { useTranslation} from '../../components/IntlProvider';
import Top from '../../layouts/Top';

const Dashboard = () => {
    const { translate } = useTranslation();

    return (
        <>
            <Top headingText={translate('dashboard')} />
        </>
    );
};

export default Dashboard;