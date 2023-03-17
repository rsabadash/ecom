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
import { warehouseProductsGeneratorProductsFormFields } from './constants';
import classes from './styles/index.module.css';

export const WarehouseProductsGeneratorProductsForm: FC<
  WarehouseProductsGeneratorProductsFormProps
> = ({ generatedProducts }) => {
  const { products: productsFieldName } =
    warehouseProductsGeneratorProductsFormFields;
  const { language, translate } = useTranslation();

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
        {fields.map((field, index) => {
          return (
            <div
              key={field.id}
              className={classes.generatedProduct__fieldGroup}
            >
              <GridAutoFit>
                <div>
                  <MultiLanguageInputAdapter
                    isRequired
                    name={`${productsFieldName}.${index}.name`}
                    placeholderTranslation="warehouseProducts.generatedName.description"
                    label={translate('warehouseProducts.generatedName')}
                    control={control}
                  />
                </div>
                <InputAdapter
                  isRequired
                  name={`${productsFieldName}.${index}.sku`}
                  placeholder={translate('warehouseProducts.sku.description')}
                  label={translate('warehouseProducts.sku')}
                  control={control}
                />
              </GridAutoFit>
              <div className={classes.generatedProduct__tags}>
                {field.attributes?.map((attribute) => {
                  return attribute.variants.map((variant) => {
                    return (
                      <Tag key={variant.variantId} variant="theme">
                        {variant.name[language]}
                      </Tag>
                    );
                  });
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
