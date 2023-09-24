import { useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { endpoints } from '../../../../common/constants/api';
import { routes } from '../../../../common/constants/routes';
import {
  useCachedAPI,
  useKeepDataBetweenNavigation,
} from '../../../../common/hooks';
import {
  Button,
  ButtonLink,
  ButtonsGroup,
} from '../../../../components/Button';
import { useTranslation } from '../../../../components/IntlProvider';
import { SectionForeground } from '../../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../../layouts/Top';
import {
  Attribute,
  AttributeFormValues,
  AttributeStateFromRouter,
} from '../common/types';
import { AttributeVariantsList } from '../list/AttributeVariantsList';
import { AttributeEditForm } from './AttributeEditForm';
import { useDeleteAttribute } from './hooks';
import { AttributeUrlParams } from './types';
import { matchAttributeDataToFormValues } from './utils';

const AttributeDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { attributeId } = useParams<AttributeUrlParams>();

  const { translate, getTranslationByLanguage } = useTranslation();
  const { getNavigationStateData } = useKeepDataBetweenNavigation();

  const categoryDetailFromLocation =
    getNavigationStateData<AttributeStateFromRouter>();

  const { data: attributeDetail, mutate: mutateAttribute } =
    useCachedAPI<Attribute>(`${endpoints.attributes.root}/${attributeId}`, {
      fallbackData: categoryDetailFromLocation,
    });

  const { deleteAttribute } = useDeleteAttribute(attributeDetail);

  const formValues: AttributeFormValues | undefined =
    matchAttributeDataToFormValues(attributeDetail);

  const handleEditButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const onFormUpdated = (): void => {
    mutateAttribute();
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const variants = attributeDetail?.variants ? attributeDetail.variants : [];

  const attributeTitle = `${translate('attribute')} "${getTranslationByLanguage(
    attributeDetail?.name,
  )}"`;

  const variantAddPath = generatePath(routes.attributes.variantAdd, {
    attributeId,
  });

  return (
    <>
      <Top>
        <TopHeading>{attributeTitle}</TopHeading>
        <TopButtons>
          <ButtonsGroup>
            {isReadOnly && (
              <ButtonLink variant="primary" to={variantAddPath}>
                {translate('attribute.variant.add')}
              </ButtonLink>
            )}
            <Button variant="primary" onClick={handleEditButtonClick}>
              {!isReadOnly ? translate('cancel') : translate('edit')}
            </Button>
            <Button variant="danger" onClick={deleteAttribute}>
              {translate('delete')}
            </Button>
          </ButtonsGroup>
        </TopButtons>
      </Top>
      <SectionForeground>
        <AttributeEditForm
          id={attributeDetail?._id}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
          onFormUpdated={onFormUpdated}
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
