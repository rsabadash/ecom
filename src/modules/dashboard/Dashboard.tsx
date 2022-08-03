import { useTranslation} from '../../components/IntlProvider';
import Top from '../../layouts/Top';
// import Editor from '../../components/Form/Editor/Editor';

const Dashboard = () => {
    const { translate } = useTranslation();

    return (
        <>
            <Top headingText={translate('dashboard')} />
            {/*<Editor />*/}
        </>
    );
};

export default Dashboard;