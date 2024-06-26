import { useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { endpoints } from '../../../../common/constants/api';
import { routes } from '../../../../common/constants/routes';
import {
  useCachedAPI,
  useKeepDataBetweenNavigation,
} from '../../../../common/hooks';
import { ModuleDetailActions } from '../../../../components/Intermodular/ModuleDetailActions';
import { useTranslation } from '../../../../components/IntlProvider';
import { SectionForeground } from '../../../../layouts/Section';
import { Top, TopHeading } from '../../../../layouts/Top';
import {
  Attribute,
  AttributeFormValues,
  AttributeStateFromRouter,
} from '../common/types';
import { AttributeVariantsList } from '../list/AttributeVariantsList';
import { AttributeEditForm } from './AttributeEditForm';
import { useDeleteAttribute } from './hooks';
import { AttributeUrlParams } from './types';
import { mapAttributeDataToFormValues } from './utils';

const AttributeDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { attributeId } = useParams<AttributeUrlParams>();

  const { translate } = useTranslation();
  const { getNavigationStateData } = useKeepDataBetweenNavigation();

  const categoryDetailFromLocation =
    getNavigationStateData<AttributeStateFromRouter>();

  const { data: attributeDetail, mutate: mutateAttribute } =
    useCachedAPI<Attribute>(`${endpoints.attributes.root}/${attributeId}`, {
      fallbackData: categoryDetailFromLocation,
    });

  const formValues: AttributeFormValues | undefined =
    mapAttributeDataToFormValues(attributeDetail);

  const toggleReadOnly = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const onFormUpdated = (): void => {
    mutateAttribute();
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const variants = attributeDetail?.variants || [];

  const attributeName = attributeDetail?.name;

  const attributeTitle = `${translate('attribute')} "${attributeName}"`;

  const variantAddPath = generatePath(routes.attributes.variantAdd, {
    attributeId,
  });

  const { deleteAttribute } = useDeleteAttribute({
    id: attributeDetail?._id,
    name: attributeName,
  });

  return (
    <>
      <Top>
        <TopHeading>{attributeTitle}</TopHeading>
        <ModuleDetailActions
          isReadOnly={isReadOnly}
          onEdit={toggleReadOnly}
          onDelete={deleteAttribute}
        />
      </Top>
      <SectionForeground>
        <AttributeEditForm
          id={attributeDetail?._id}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
          onFormReset={toggleReadOnly}
          onFormUpdated={onFormUpdated}
          attributeName={attributeName}
        />
      </SectionForeground>
      {isReadOnly && (
        <AttributeVariantsList
          variants={variants}
          addVariantLink={variantAddPath}
        />
      )}
    </>
  );
};

export default AttributeDetail;
