import { FC, useCallback } from 'react';
import { Collapse } from '../../../components/Collapse';
import {
  WarehouseProductsGeneratorAttributeFormSectionProps,
  VariantVirtualFieldValue,
  AttributeVirtualFieldValue,
} from './types';
import { CheckboxValue } from '../../../components/Fields/Checkbox/types';
import { warehouseProductsGeneratorFormFields } from './constants';
import { CheckboxAdapter } from '../../../components/FormFieldsAdapter';
import { useTranslation } from '../../../components/IntlProvider';
import { Variant } from '../../attributes/common/types';
import classes from './styles/index.module.css';

export const WarehouseProductsGeneratorAttributeFormSection: FC<
  WarehouseProductsGeneratorAttributeFormSectionProps
> = ({ attribute, setValue, getValues, control }) => {
  const { language, translate } = useTranslation();
  const { _id: attributeId, name, variants } = attribute;
  const hasVariants = variants?.length > 0;

  const removeEmptyAttribute = useCallback(
    (id: string): void => {
      const { attributesVirtual } = warehouseProductsGeneratorFormFields;

      const allAttributes = getValues(
        attributesVirtual,
      ) as AttributeVirtualFieldValue;

      delete allAttributes[id];

      setValue(attributesVirtual, allAttributes);
    },
    [getValues, setValue],
  );

  const handleChange = useCallback(
    (isChecked: CheckboxValue, value: Variant): void => {
      const name = `${warehouseProductsGeneratorFormFields.attributesVirtual}.${attributeId}`;

      const checkedVariants = getValues(name) as VariantVirtualFieldValue[];

      let fieldVale: VariantVirtualFieldValue[];

      if (isChecked) {
        const newVariant = {
          name: value.name,
          variantId: value.variantId,
          attributeId: attributeId,
        };

        if (Array.isArray(checkedVariants)) {
          fieldVale = [...checkedVariants, newVariant];
        } else {
          fieldVale = [newVariant];
        }
      } else {
        fieldVale = checkedVariants.filter(
          (variant) => variant.variantId !== value.variantId,
        );

        if (fieldVale.length === 0) {
          return removeEmptyAttribute(attributeId);
        }
      }

      setValue(name, fieldVale);
    },
    [attributeId, getValues, removeEmptyAttribute, setValue],
  );

  return (
    <div className={classes.generator__attributesRow}>
      <Collapse
        headerClassName={classes.generator__attributesName}
        header={name[language]}
        body={
          <div className={classes.generator__variants}>
            {hasVariants ? (
              variants.map((variant) => {
                return (
                  <CheckboxAdapter
                    key={variant.variantId}
                    name={`${warehouseProductsGeneratorFormFields.attributes}.${attributeId}.variants.${variant.variantId}`}
                    label={variant.name[language]}
                    onChange={(isChecked) => handleChange(isChecked, variant)}
                    control={control}
                  />
                );
              })
            ) : (
              <div className={classes.generator__noVariants}>
                {translate('warehouseProducts.attributes.noVariants')}
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};
