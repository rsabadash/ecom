import { memo } from 'react';

import { useTranslation } from '../../../components/IntlProvider';
import { Tag } from '../../../components/Tag';
import { ProductsListAttributesProps } from './types';

import classes from './styles/index.module.css';

export const ProductsListAttributes = memo<ProductsListAttributesProps>(
  ({ item }) => {
    const { getTranslationByLanguage } = useTranslation();

    return (
      <>
        {item.attributes?.map((attribute) => {
          return (
            <div
              key={attribute.attributeId}
              className={classes.warehouseListAttributes}
            >
              <div>{getTranslationByLanguage(attribute.name)}</div>
              <div className={classes.warehouseListVariants}>
                {attribute.variants.map((variant) => {
                  return (
                    <Tag key={variant.variantId} variant="theme">
                      {getTranslationByLanguage(variant.name)}
                    </Tag>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>
    );
  },
);

ProductsListAttributes.displayName = 'ProductsListAttributes';
