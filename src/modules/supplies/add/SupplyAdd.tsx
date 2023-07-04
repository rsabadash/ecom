import { routes } from '../../../common/constants/routes';
import { ButtonLink } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { SupplyForm } from './SupplyForm';

const SupplyAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('supply.add')}</TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.supplies.root}>
            {translate('cancel')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <SupplyForm />
    </>
  );
};

export default SupplyAdd;
