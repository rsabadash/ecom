import { useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import { useCachedAPI } from '../../../common/hooks';
import { Button, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useDeleteVariant } from './hooks';
import { Variant, VariantFormValues, VariantUrlParams } from './types';
import { matchVariantDataToFormValues } from './utils';
import { VariantForm } from './VariantForm';

const VariantDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { attributeId, variantId } = useParams<VariantUrlParams>();
  const { translate, getTranslationWithFallback } = useTranslation();
  const { deleteVariant } = useDeleteVariant({ attributeId, variantId });

  const variantLinkWithAttributeId = generatePath(
    endpoints.attributes.getVariants,
    {
      attributeId,
    },
  );

  const { data: variantDetail } = useCachedAPI<Variant>(
    `${variantLinkWithAttributeId}/${variantId}`,
  );

  const handleButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const formValues: VariantFormValues | undefined =
    matchVariantDataToFormValues(variantDetail);

  const variantTitle = `${translate(
    'attribute.variant',
  )} "${getTranslationWithFallback(variantDetail?.name)}"`;

  return (
    <>
      <Top>
        <TopHeading>{variantTitle}</TopHeading>
        <TopButtons>
          <ButtonsGroup>
            <Button variant="primary" onClick={handleButtonClick}>
              {!isReadOnly ? translate('cancel') : translate('edit')}
            </Button>
            <Button variant="danger" onClick={deleteVariant}>
              {translate('delete')}
            </Button>
          </ButtonsGroup>
        </TopButtons>
      </Top>
      <SectionForeground>
        <VariantForm isReadOnly={isReadOnly} defaultValues={formValues} />
      </SectionForeground>
    </>
  );
};

export default VariantDetail;
