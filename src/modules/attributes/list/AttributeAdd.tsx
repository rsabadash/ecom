import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useTranslation } from '../../../components/IntlProvider';
import { ButtonLink } from '../../../components/Button';
import { routes } from '../../../common/constants/routes';
import { Foreground } from '../../../layouts/Foreground';
import { AttributeForm } from '../common/AttributeForm';

const AttributeAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('add')}</TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.attributes.root}>
            {translate('cancel')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <Foreground>
        <AttributeForm />
      </Foreground>
    </>
  );
};

export default AttributeAdd;
