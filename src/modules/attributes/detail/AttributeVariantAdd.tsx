import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useTranslation } from '../../../components/IntlProvider';
import { ButtonLink } from '../../../components/Button';
import { routes } from '../../../common/constants/routes';
import { Foreground } from '../../../layouts/Foreground';
import { AttributeVariantForm } from './AttributeVariantForm';
import { useParams } from 'react-router-dom';
import { AttributeUrlParams } from './types';

const AttributeVariantAdd = () => {
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
      <Foreground>
        <AttributeVariantForm />
      </Foreground>
    </>
  );
};

export default AttributeVariantAdd;
