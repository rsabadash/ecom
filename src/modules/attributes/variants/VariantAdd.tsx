import { useParams } from 'react-router-dom';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useTranslation } from '../../../components/IntlProvider';
import { ButtonLink } from '../../../components/Button';
import { routes } from '../../../common/constants/routes';
import { SectionForeground } from '../../../layouts/Section';
import { VariantForm } from './VariantForm';
import { AttributeUrlParams } from '../attributes/types';

const VariantAdd = () => {
  const { translate } = useTranslation();
  const { attributeId } = useParams<AttributeUrlParams>();

  return (
    <>
      <Top>
        <TopHeading>{translate('attribute.variant.add')}</TopHeading>
        {attributeId && (
          <TopButtons>
            <ButtonLink
              variant="primary"
              to={`${routes.attributes.root}/${attributeId}`}
            >
              {translate('cancel')}
            </ButtonLink>
          </TopButtons>
        )}
      </Top>
      <SectionForeground>
        <VariantForm />
      </SectionForeground>
    </>
  );
};

export default VariantAdd;
