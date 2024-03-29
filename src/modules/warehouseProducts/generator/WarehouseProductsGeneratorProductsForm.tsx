import { FC, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';

import { Button } from '../../../components/Button';
import { Form, FormContent } from '../../../components/FormFields';
import {
  InputAdapter,
  MultiLanguageInputAdapter,
} from '../../../components/FormFieldsAdapter';
import { useTranslation } from '../../../components/IntlProvider';
import { Label } from '../../../components/Label';
import { Tag } from '../../../components/Tag';
import { GridAutoFit, GridFullWidth } from '../../../layouts/Grid';
import { warehouseProductsGeneratorProductsFormFields } from './constants';
import {
  useWarehouseProductsGeneratorProductsForm,
  useWarehouseProductsGeneratorProductsFormSubmit,
} from './hooks';
import { WarehouseProductsGeneratorProductsFormProps } from './types';
import { WarehouseProductUnitField } from './WarehouseProductUnitField';

import classes from './styles/index.module.css';

export const WarehouseProductsGeneratorProductsForm: FC<
  WarehouseProductsGeneratorProductsFormProps
> = ({ generatedProducts }) => {
  const { products: productsFieldName } =
    warehouseProductsGeneratorProductsFormFields;

  const { translate, getTranslationByLanguage } = useTranslation();

  const { handleFormSubmit } =
    useWarehouseProductsGeneratorProductsFormSubmit();

  const { handleSubmit, setValue, clearErrors, control } =
    useWarehouseProductsGeneratorProductsForm({
      submitHandler: handleFormSubmit,
      defaultValues: {
        products: generatedProducts,
      },
    });

  useEffect(() => {
    clearErrors();
    setValue(productsFieldName, generatedProducts);
  }, [generatedProducts, setValue, clearErrors, productsFieldName]);

  const { fields } = useFieldArray({
    control,
    name: productsFieldName,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormContent>
        {fields.map(({ id, attributes }, index) => {
          return (
            <div key={id} className={classes.generatedProduct__fieldGroup}>
              <GridAutoFit>
                <GridFullWidth>
                  <MultiLanguageInputAdapter
                    isRequired
                    name={`${productsFieldName}.${index}.name`}
                    placeholderTranslation="warehouseProduct.generatedName.description"
                    label={translate('warehouseProduct.generatedName')}
                    control={control}
                  />
                </GridFullWidth>
                <WarehouseProductUnitField
                  name={`${productsFieldName}.${index}.unit`}
                  control={control}
                />
                <InputAdapter
                  isRequired
                  name={`${productsFieldName}.${index}.sku`}
                  placeholder={translate('warehouseProduct.sku.description')}
                  label={translate('warehouseProduct.sku')}
                  control={control}
                />
                {!!attributes?.length && (
                  <GridFullWidth>
                    <Label
                      labelId={id}
                      labelClassName={classes.generatedProduct__tagsTitle}
                    >
                      Атрибути
                    </Label>
                    <div
                      aria-labelledby={id}
                      className={classes.generatedProduct__tags}
                    >
                      {attributes?.map((attribute) => {
                        return attribute.variants.map((variant) => {
                          return (
                            <Tag key={variant.variantId} variant="theme">
                              {getTranslationByLanguage(variant.name)}
                            </Tag>
                          );
                        });
                      })}
                    </div>
                  </GridFullWidth>
                )}
              </GridAutoFit>
            </div>
          );
        })}
      </FormContent>
      <FormContent>
        <Button variant="primary" type="submit">
          {translate('save')}
        </Button>
      </FormContent>
    </Form>
  );
};
