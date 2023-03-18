import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useCachedAPI } from '../../../hooks';
import { Variant, VariantFormValues, VariantUrlParams } from './types';
import { Button, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { Foreground } from '../../../layouts/Foreground';
import { endpoints } from '../../../common/constants/api';
import { VariantForm } from './VariantForm';
import { useDeleteVariant } from './hooks';
import { matchVariantDataToFormValues } from './utils';

const VariantDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { variantId } = useParams<VariantUrlParams>();
  const { language, translate } = useTranslation();
  const { deleteVariant } = useDeleteVariant(variantId);

  const { data: variantDetail } = useCachedAPI<Variant>(
    `${endpoints.attributes.variants}/${variantId}`,
  );

  const handleButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const formValues: VariantFormValues | undefined =
    matchVariantDataToFormValues(variantDetail);

  return (
    <>
      <Top>
        <TopHeading>{variantDetail?.name[language]}</TopHeading>
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
      <Foreground>
        <VariantForm
          variantId={variantDetail?.variantId}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
        />
      </Foreground>
    </>
  );
};

export default VariantDetail;
