import { useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useCachedAPI } from '../../../hooks';
import { AttributeUrlParams } from './types';
import { Button, ButtonLink, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { Foreground } from '../../../layouts/Foreground';
import { endpoints } from '../../../common/constants/api';
import { routes } from '../../../common/constants/routes';
import { AttributeForm } from '../common/AttributeForm';
import { useDeleteAttribute } from './hooks';
import { matchAttributeDataToFormValues } from './utils';
import { AttributesVariantsList } from '../common/AttributesVariantsList';
import { Attribute, AttributeFormValues } from '../common/types';

const AttributeDetail = () => {
  const { attributeId } = useParams<AttributeUrlParams>();
  const { language, translate } = useTranslation();
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { data: attributeDetail } = useCachedAPI<Attribute>(
    `${endpoints.attributes.root}/${attributeId}`,
  );

  const { deleteAttribute } = useDeleteAttribute(attributeDetail?._id);

  const formValues: AttributeFormValues | undefined =
    matchAttributeDataToFormValues(attributeDetail);

  const handleButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const showAttributeVariantsList =
    attributeDetail?.variants && attributeDetail.variants.length !== 0;

  const variantAddPath = generatePath(routes.attributes.variantAdd, {
    attributeId,
  });

  return (
    <>
      <Top>
        <TopHeading>{attributeDetail?.name[language]}</TopHeading>
        <TopButtons>
          <ButtonsGroup>
            {isReadOnly && (
              <ButtonLink variant="primary" to={routes.attributes.add}>
                {translate('add')}
              </ButtonLink>
            )}
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
      <Foreground>
        <AttributeForm
          id={attributeDetail?._id}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
        />
      </Foreground>
      <>
        {showAttributeVariantsList && isReadOnly && (
          <AttributesVariantsList
            isDetailList
            variants={attributeDetail.variants}
          />
        )}
        {/*TODO No data placeholder component*/}
        {!showAttributeVariantsList && (
          <div
            style={{
              border: '1px dashed #020202',
              padding: '16px',
              borderRadius: '0.6em',
              textAlign: 'center',
            }}
          >
            no data
          </div>
        )}
      </>
    </>
  );
};

export default AttributeDetail;
