import { routes } from '../../../../common/constants/routes';
import { ButtonLink } from '../../../../components/Button';
import { useTranslation } from '../../../../components/IntlProvider';
import { SectionForeground } from '../../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../../layouts/Top';
import { AttributeAddForm } from './AttributeAddForm';

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
        <AttributeAddForm />
      </SectionForeground>
    </>
  );
};

export default AttributeAdd;
