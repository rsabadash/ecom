import { FC, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';

import { Button } from '../../../components/Button';
import { Form, FormContent } from '../../../components/FormFields';
import { InputAdapter } from '../../../components/FormFieldsAdapter';
import { useTranslation } from '../../../components/IntlProvider';
import { Label } from '../../../components/Label';
import { Tag } from '../../../components/Tag';
import { GridAutoFit, GridFullWidth } from '../../../layouts/Grid';
import { productsGeneratorProductsFormFields } from './constants';
import {
  useProductsGeneratorProductsForm,
  useProductsGeneratorProductsFormSubmit,
} from './hooks';
import { ProductUnitField } from './ProductUnitField';
import { ProductsGeneratorProductsFormProps } from './types';

import classes from './styles/index.module.css';

export const ProductsGeneratorProductsForm: FC<
  ProductsGeneratorProductsFormProps
> = ({ generatedProducts }) => {
  const { products: productsFieldName } = productsGeneratorProductsFormFields;

  const { translate, getTranslationByLanguage } = useTranslation();

  const { handleFormSubmit } = useProductsGeneratorProductsFormSubmit();

  const { handleSubmit, setValue, clearErrors, control } =
    useProductsGeneratorProductsForm({
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
                  <InputAdapter
                    isRequired
                    name={`${productsFieldName}.${index}.name`}
                    placeholder={translate('product.generatedName.description')}
                    label={translate('product.generatedName')}
                    control={control}
                  />
                </GridFullWidth>
                <ProductUnitField
                  name={`${productsFieldName}.${index}.unit`}
                  control={control}
                />
                <InputAdapter
                  isRequired
                  name={`${productsFieldName}.${index}.sku`}
                  placeholder={translate('product.sku.description')}
                  label={translate('product.sku')}
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
