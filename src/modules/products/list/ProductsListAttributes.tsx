import { memo } from 'react';

import { Tag } from '../../../components/Tag';
import { ProductsListAttributesProps } from './types';

import classes from './styles/index.module.css';

export const ProductsListAttributes = memo<ProductsListAttributesProps>(
  ({ item }) => {
    return (
      <>
        {item.attributes?.map((attribute) => {
          return (
            <div
              key={attribute.attributeId}
              className={classes.warehouseListAttributes}
            >
              <div>{attribute.name}</div>
              <div className={classes.warehouseListVariants}>
                {attribute.variants.map((variant) => {
                  return (
                    <Tag key={variant.variantId} variant="theme">
                      {variant.name}
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
