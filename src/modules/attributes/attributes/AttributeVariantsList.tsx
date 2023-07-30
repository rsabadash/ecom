import { FC } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import {
  RowCustomRenderProps,
  Table,
  TableColumnGeneric,
} from '../../../components/Table';
import { TABLE_ATTRIBUTE_VARIANTS_ID } from './constants';
import { AttributesVariantsListProps, AttributeUrlParams } from './types';
import { routes } from '../../../common/constants/routes';
import { useAttributeVariantsTableColumns } from './hooks';
import { Variant } from '../variants/types';
import { Heading } from '../../../components/Heading';
import { useTranslation } from '../../../components/IntlProvider';
import { AttributeVariantsListPlaceholder } from './AttributeVariantsListPlaceholder';
import classes from './styles/index.module.css';

export const AttributeVariantsList: FC<AttributesVariantsListProps> = ({
  variants,
  addVariantLink,
}) => {
  const { translate } = useTranslation();
  const { attributeId } = useParams<AttributeUrlParams>();

  const columns: TableColumnGeneric<Variant>[] =
    useAttributeVariantsTableColumns();

  return (
    <>
      <Heading
        id={TABLE_ATTRIBUTE_VARIANTS_ID}
        level={2}
        fontSize={4}
        classNameHeading={classes.attributes__variantsTitle}
      >
        {translate('attribute.variants')}
      </Heading>
      {variants.length > 0 ? (
        <Table
          items={variants}
          columns={columns}
          tableRowRenderKey="variantId"
          tableLabeledBy={TABLE_ATTRIBUTE_VARIANTS_ID}
          rowCustomRender={({
            row,
            item,
            rowProps,
          }: RowCustomRenderProps<Variant>) => {
            const variantDetailPath = generatePath(
              routes.attributes.variantDetail,
              {
                attributeId: attributeId,
                variantId: item.variantId,
              },
            );

            return (
              <Link key={item.variantId} to={variantDetailPath} {...rowProps}>
                {row}
              </Link>
            );
          }}
        />
      ) : (
        <AttributeVariantsListPlaceholder addVariantLink={addVariantLink} />
      )}
    </>
  );
};
