import { FC, useCallback } from 'react';
import { Collapse } from '../../../components/Collapse';
import {
  WarehouseProductsGeneratorAttributeFormSectionProps,
  Variant,
  VariantVirtualFieldValue,
  AttributeVirtualFieldValue,
} from './types';
import { CheckboxValue } from '../../../components/Fields/Checkbox/types';
import { warehouseProductsGeneratorFormFields } from './constants';
import { CheckboxAdapter } from '../../../components/FormFieldsAdapter';
import { useTranslation } from '../../../components/IntlProvider';
import classes from './styles/index.module.css';

export const WarehouseProductsGeneratorAttributeFormSection: FC<
  WarehouseProductsGeneratorAttributeFormSectionProps
> = ({ attribute, setValue, getValues, control }) => {
  const { language } = useTranslation();

  const removeEmptyAttribute = useCallback(
    (value: Variant): void => {
      const { attributesVirtual } = warehouseProductsGeneratorFormFields;

      const allAttributes = getValues(
        attributesVirtual,
      ) as AttributeVirtualFieldValue;

      delete allAttributes[value.attributeId];

      setValue(attributesVirtual, allAttributes);
    },
    [getValues, setValue],
  );

  const handleChange = useCallback(
    (isChecked: CheckboxValue, value: Variant): void => {
      const name = `${warehouseProductsGeneratorFormFields.attributesVirtual}.${value.attributeId}`;

      const checkedVariants = getValues(name) as VariantVirtualFieldValue[];

      let fieldVale: VariantVirtualFieldValue[];

      if (isChecked) {
        const newVariant = {
          name: value.name,
          variantId: value.variantId,
          attributeId: value.attributeId,
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
          return removeEmptyAttribute(value);
        }
      }

      setValue(name, fieldVale);
    },
    [getValues, removeEmptyAttribute, setValue],
  );

  return (
    <div className={classes.collapseWrapper}>
      <Collapse
        headerClassName={classes.collapseHeader}
        header={attribute.name[language]}
        body={
          <div className={classes.variantsWrapper}>
            {attribute.variants.map((variant) => {
              return (
                <CheckboxAdapter
                  key={variant.variantId}
                  name={`${warehouseProductsGeneratorFormFields.attributes}.${attribute._id}.variants.${variant.variantId}`}
                  label={variant.name[language]}
                  onChange={(isChecked) => handleChange(isChecked, variant)}
                  control={control}
                />
              );
            })}
          </div>
        }
      />
    </div>
  );
};
