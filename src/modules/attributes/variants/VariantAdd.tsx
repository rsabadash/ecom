import { useParams } from 'react-router-dom';

import { routes } from '../../../common/constants/routes';
import { ButtonLink } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { AttributeUrlParams } from '../attributes/types';
import { VariantForm } from './VariantForm';

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
