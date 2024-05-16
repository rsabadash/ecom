import { useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { endpoints } from '../../../../common/constants/api';
import {
  useCachedAPI,
  useKeepDataBetweenNavigation,
} from '../../../../common/hooks';
import { ModuleDetailActions } from '../../../../components/Intermodular/ModuleDetailActions';
import { useTranslation } from '../../../../components/IntlProvider';
import { SectionForeground } from '../../../../layouts/Section';
import { Top, TopHeading } from '../../../../layouts/Top';
import {
  Variant,
  VariantFormValues,
  VariantStateFromRouter,
} from '../common/types';
import { useDeleteVariant } from './hooks';
import { VariantUrlParams } from './types';
import { mapVariantDataToFormValues } from './utils';
import { VariantEditForm } from './VariantEditForm';

const VariantDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { attributeId, variantId } = useParams<VariantUrlParams>();

  const { translate } = useTranslation();
  const { getNavigationStateData } = useKeepDataBetweenNavigation();

  const categoryDetailFromLocation =
    getNavigationStateData<VariantStateFromRouter>();

  const variantLinkWithAttributeId = generatePath(
    endpoints.attributes.getVariants,
    {
      attributeId,
    },
  );

  const { data: variantDetail, mutate: mutateVariant } = useCachedAPI<Variant>(
    `${variantLinkWithAttributeId}/${variantId}`,
    {
      fallbackData: categoryDetailFromLocation,
    },
  );

  const toggleReadOnly = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const onFormUpdated = (): void => {
    mutateVariant();
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const formValues: VariantFormValues | undefined =
    mapVariantDataToFormValues(variantDetail);

  const variantName = variantDetail?.name;

  const variantTitle = `${translate('variant')} "${variantName}"`;

  const { deleteVariant } = useDeleteVariant({
    attributeId,
    variantId,
    name: variantName,
  });

  return (
    <>
      <Top>
        <TopHeading>{variantTitle}</TopHeading>
        <ModuleDetailActions
          isReadOnly={isReadOnly}
          onEdit={toggleReadOnly}
          onDelete={deleteVariant}
        />
      </Top>
      <SectionForeground>
        <VariantEditForm
          id={variantDetail?.variantId}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
          onFormReset={toggleReadOnly}
          onFormUpdated={onFormUpdated}
          variantName={variantName}
          attributeId={attributeId}
        />
      </SectionForeground>
    </>
  );
};

export default VariantDetail;
