import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useCachedAPI } from '../../../hooks';
import { AttributeVariantFormValues, AttributeVariantUrlParams } from './types';
import { Button, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { Foreground } from '../../../layouts/Foreground';
import { endpoints } from '../../../common/constants/api';
import { AttributeVariantForm } from './AttributeVariantForm';
import { matchAttributeVariantDataToFormValues } from './utils';
import { AttributeVariant } from '../common/types';
import { useDeleteAttributeVariant } from './hooks/useDeleteAttributeVariant';

const AttributeVariantDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { variantId } = useParams<AttributeVariantUrlParams>();
  const { language, translate } = useTranslation();
  const { deleteAttributeVariant } = useDeleteAttributeVariant(variantId);

  const { data: attributeVariantDetail } = useCachedAPI<AttributeVariant>(
    `${endpoints.attributes.variants}/${variantId}`,
  );

  const handleButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const formValues: AttributeVariantFormValues | undefined =
    matchAttributeVariantDataToFormValues(attributeVariantDetail);

  return (
    <>
      <Top>
        <TopHeading>{attributeVariantDetail?.name[language]}</TopHeading>
        <TopButtons>
          <ButtonsGroup>
            <Button variant="primary" onClick={handleButtonClick}>
              {!isReadOnly ? translate('cancel') : translate('edit')}
            </Button>
            <Button variant="danger" onClick={deleteAttributeVariant}>
              {translate('delete')}
            </Button>
          </ButtonsGroup>
        </TopButtons>
      </Top>
      <Foreground>
        <AttributeVariantForm
          variantId={attributeVariantDetail?.variantId}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
        />
      </Foreground>
    </>
  );
};

export default AttributeVariantDetail;
