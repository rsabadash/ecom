import { useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useCachedAPI } from '../../../hooks';
import { Button, ButtonLink, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { endpoints } from '../../../common/constants/api';
import { routes } from '../../../common/constants/routes';
import { AttributeForm } from './AttributeForm';
import { useDeleteAttribute } from './hooks';
import { matchAttributeDataToFormValues } from './utils';
import { AttributeVariantsList } from './AttributeVariantsList';
import { Attribute, AttributeFormValues, AttributeUrlParams } from './types';

const AttributeDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { attributeId } = useParams<AttributeUrlParams>();
  const { language, translate } = useTranslation();

  const { data: attributeDetail } = useCachedAPI<Attribute>(
    `${endpoints.attributes.root}/${attributeId}`,
  );

  const { deleteAttribute } = useDeleteAttribute(attributeDetail?._id);

  const formValues: AttributeFormValues | undefined =
    matchAttributeDataToFormValues(attributeDetail);

  const handleButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const variants = attributeDetail?.variants ? attributeDetail.variants : [];

  const attributeTitle = `${translate('attribute')} "${
    attributeDetail?.name[language]
  }"`;

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
            <Button variant="primary" onClick={handleButtonClick}>
              {!isReadOnly ? translate('cancel') : translate('edit')}
            </Button>
            <Button variant="danger" onClick={deleteAttribute}>
              {translate('delete')}
            </Button>
          </ButtonsGroup>
        </TopButtons>
      </Top>
      <SectionForeground>
        <AttributeForm
          id={attributeDetail?._id}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
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
