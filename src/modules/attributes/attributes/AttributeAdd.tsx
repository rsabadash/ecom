import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useTranslation } from '../../../components/IntlProvider';
import { ButtonLink } from '../../../components/Button';
import { routes } from '../../../common/constants/routes';
import { SectionForeground } from '../../../layouts/Section';
import { AttributeForm } from './AttributeForm';

const AttributeAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('attribute.add')}</TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.attributes.root}>
            {translate('cancel')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <SectionForeground>
        <AttributeForm />
      </SectionForeground>
    </>
  );
};

export default AttributeAdd;
