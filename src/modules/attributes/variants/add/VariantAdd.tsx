import { useParams } from 'react-router-dom';

import { routes } from '../../../../common/constants/routes';
import { ButtonLink } from '../../../../components/Button';
import { useTranslation } from '../../../../components/IntlProvider';
import { SectionForeground } from '../../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../../layouts/Top';
import { VariantAddUrlParams } from './types';
import { VariantAddForm } from './VariantAddForm';

const VariantAdd = () => {
  const { translate } = useTranslation();

  const { attributeId } = useParams<VariantAddUrlParams>();

  return (
    <>
      <Top>
        <TopHeading>{translate('variant.add')}</TopHeading>
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
        <VariantAddForm attributeId={attributeId} />
      </SectionForeground>
    </>
  );
};

export default VariantAdd;
