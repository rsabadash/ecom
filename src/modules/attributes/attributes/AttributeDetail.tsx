import { useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import classes from './styles/index.module.css';

import { endpoints } from '../../../common/constants/api';
import { routes } from '../../../common/constants/routes';
import { useCachedAPI } from '../../../common/hooks';
import { Button, ButtonLink, ButtonsGroup } from '../../../components/Button';
import { Heading } from '../../../components/Heading';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { AttributeForm } from './AttributeForm';
import { AttributeVariantsList } from './AttributeVariantsList';
import { TABLE_ATTRIBUTE_VARIANTS_ID } from './constants';
import { useDeleteAttribute } from './hooks';
import { Attribute, AttributeFormValues, AttributeUrlParams } from './types';
import { matchAttributeDataToFormValues } from './utils';

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
      <SectionForeground>
        <AttributeForm
          id={attributeDetail?._id}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
        />
      </SectionForeground>
      <>
        <Heading
          id={TABLE_ATTRIBUTE_VARIANTS_ID}
          level={2}
          fontSize={6}
          classNameHeading={classes.attributes__variantsTitle}
        >
          {translate('attribute.variants')}
        </Heading>
        {showAttributeVariantsList && isReadOnly && (
          <AttributeVariantsList variants={attributeDetail.variants} />
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
