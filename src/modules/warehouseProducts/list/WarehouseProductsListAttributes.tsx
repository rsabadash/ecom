import { memo } from 'react';
import { useTranslation } from '../../../components/IntlProvider';
import { Tag } from '../../../components/Tag';
import classes from './styles/index.module.css';
import { WarehouseProductsListAttributesProps } from './types';

export const WarehouseProductsListAttributes =
  memo<WarehouseProductsListAttributesProps>(({ item }) => {
    const { language } = useTranslation();

    return (
      <>
        {item.attributes?.map((attribute) => {
          return (
            <div
              key={attribute.attributeId}
              className={classes.warehouseListAttributes}
            >
              <div>{attribute.name[language]}</div>
              <div className={classes.warehouseListVariants}>
                {attribute.variants.map((variant) => {
                  return (
                    <Tag key={variant.variantId} variant="theme">
                      {variant.name[language]}
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