import { FC, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import {
  useWarehouseProductsGeneratorProductsForm,
  useWarehouseProductsGeneratorProductsFormSubmit,
} from './hooks';
import { WarehouseProductsGeneratorProductsFormProps } from './types';
import { Form, FormContent } from '../../../components/FormFields';
import {
  InputAdapter,
  MultiLanguageInputAdapter,
} from '../../../components/FormFieldsAdapter';
import { Tag } from '../../../components/Tag';
import { useTranslation } from '../../../components/IntlProvider';
import { GridAutoFit } from '../../../layouts/Grid';
import { Button } from '../../../components/Button';
import classes from './styles/index.module.css';

export const WarehouseProductsGeneratorProductsForm: FC<
  WarehouseProductsGeneratorProductsFormProps
> = ({ products }) => {
  const { language, translate } = useTranslation();

  const { handleFormSubmit } =
    useWarehouseProductsGeneratorProductsFormSubmit();

  const { handleSubmit, setValue, clearErrors, control } =
    useWarehouseProductsGeneratorProductsForm({
      submitHandler: handleFormSubmit,
      defaultValues: {
        product: products,
      },
    });

  useEffect(() => {
    clearErrors();
    setValue('product', products);
  }, [products, setValue, clearErrors]);

  const { fields } = useFieldArray({
    control,
    name: 'product',
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormContent>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className={classes.productFieldGroup}>
              <GridAutoFit>
                <div>
                  <MultiLanguageInputAdapter
                    isRequired
                    name={`product.${index}.name`}
                    placeholderTranslation="warehouseProducts.generatedName.fillIn"
                    label={translate('warehouseProducts.generatedName')}
                    control={control}
                  />
                </div>
                <InputAdapter
                  isRequired
                  name={`product.${index}.sku`}
                  placeholder={translate('warehouseProducts.sku.fillIn')}
                  label={translate('warehouseProducts.sku')}
                  control={control}
                />
              </GridAutoFit>
              <div className={classes.generatedProductFieldTags}>
                {field.attribute?.variants.map((variant) => {
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
      </FormContent>
      <FormContent>
        <Button variant="primary" type="submit">
          {translate('save')}
        </Button>
      </FormContent>
    </Form>
  );
};
