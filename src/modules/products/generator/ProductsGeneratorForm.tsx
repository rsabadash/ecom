import { FC } from 'react';

import { endpoints } from '../../../common/constants/api';
import { useCachedPaginationAPI } from '../../../common/hooks';
import { Button, ButtonsGroup } from '../../../components/Button';
import {
  Form,
  FormContent,
  FormDescription,
} from '../../../components/FormFields';
import { InputAdapter } from '../../../components/FormFieldsAdapter';
import { GridRowBalancer } from '../../../components/GridRowBalancer';
import { useTranslation } from '../../../components/IntlProvider';
import { usePaginationLimit } from '../../../components/Pagination/hooks';
import { Attribute } from '../../attributes/attributes/common/types';
import {
  buttonNames,
  PRODUCTS_GENERATOR_DEFAULT_VALUES,
  productsGeneratorFormFields,
} from './constants';
import {
  useProductsGeneratorForm,
  useProductsGeneratorFormSubmit,
} from './hooks';
import { ProductsGeneratorAttributeFormSection } from './ProductsGeneratorAttributeFormSection';
import { ProductUnitField } from './ProductUnitField';
import { ProductsGeneratorFormProps } from './types';

import classes from './styles/index.module.css';

export const ProductsGeneratorForm: FC<ProductsGeneratorFormProps> = ({
  onGeneratedProductsCallback,
}) => {
  const { translate } = useTranslation();

  const { limitValue } = usePaginationLimit();

  const { list } = useCachedPaginationAPI<Attribute>(
    endpoints.attributes.root,
    {
      limit: limitValue,
    },
  );

  const { handleFormSubmit } = useProductsGeneratorFormSubmit({
    onGeneratedProducts: onGeneratedProductsCallback,
  });

  const { control, setValue, getValues, handleSubmit } =
    useProductsGeneratorForm({
      defaultValues: PRODUCTS_GENERATOR_DEFAULT_VALUES,
      submitHandler: handleFormSubmit,
    });

  return (
    <Form onSubmit={handleSubmit}>
      <FormContent>
        <GridRowBalancer columns={2} elementRows={4}>
          <InputAdapter
            isRequired
            name={productsGeneratorFormFields.name}
            label={translate('product.name')}
            placeholder={translate('product.name.description')}
            control={control}
            columnIndex={1}
          />
          <ProductUnitField
            name={productsGeneratorFormFields.unit}
            control={control}
          />
        </GridRowBalancer>
      </FormContent>
      <FormContent>
        <FormDescription>
          {translate('products.generate.form.description')}
        </FormDescription>
      </FormContent>
      <FormContent>
        <div className={classes.generator__attributes}>
          {list?.map((attribute) => {
            return (
              <ProductsGeneratorAttributeFormSection
                key={attribute._id}
                control={control}
                setValue={setValue}
                getValues={getValues}
                attribute={attribute}
              />
            );
          })}
        </div>
      </FormContent>
      <FormContent>
        <ButtonsGroup>
          <Button variant="primary" type="submit" name={buttonNames.oneProduct}>
            {translate('product.generateOne')}
          </Button>
          <Button
            variant="primary"
            type="submit"
            name={buttonNames.manyProducts}
          >
            {translate('product.generateMany')}
          </Button>
        </ButtonsGroup>
      </FormContent>
    </Form>
  );
};
