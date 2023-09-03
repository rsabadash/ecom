import { memo } from 'react';

import { useTranslation } from '../../../components/IntlProvider';
import { Tag } from '../../../components/Tag';
import { WarehouseProductsListAttributesProps } from './types';

import classes from './styles/index.module.css';

export const WarehouseProductsListAttributes =
  memo<WarehouseProductsListAttributesProps>(({ item }) => {
    const { getTranslationWithFallback } = useTranslation();

    return (
      <>
        {item.attributes?.map((attribute) => {
          return (
            <div
              key={attribute.attributeId}
              className={classes.warehouseListAttributes}
            >
              <div>{getTranslationWithFallback(attribute.name)}</div>
              <div className={classes.warehouseListVariants}>
                {attribute.variants.map((variant) => {
                  return (
                    <Tag key={variant.variantId} variant="theme">
                      {getTranslationWithFallback(variant.name)}
                    </Tag>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>
    );
  });

WarehouseProductsListAttributes.displayName = 'WarehouseProductsListAttributes';
