import { FC } from 'react';

import { endpoints } from '../../../common/constants/api';
import { useCachedPaginationAPI } from '../../../common/hooks';
import { Button, ButtonsGroup } from '../../../components/Button';
import {
  Form,
  FormContent,
  FormDescription,
} from '../../../components/FormFields';
import { MultiLanguageInputAdapter } from '../../../components/FormFieldsAdapter';
import { GridRowBalancer } from '../../../components/GridRowBalancer';
import { useTranslation } from '../../../components/IntlProvider';
import { usePaginationLimit } from '../../../components/Pagination/hooks';
import { Attribute } from '../../attributes/attributes/common/types';
import { buttonNames, warehouseProductsGeneratorFormFields } from './constants';
import {
  useWarehouseProductsGeneratorForm,
  useWarehouseProductsGeneratorFormSubmit,
} from './hooks';
import { WarehouseProductsGeneratorFormProps } from './types';
import { WarehouseProductsGeneratorAttributeFormSection } from './WarehouseProductsGeneratorAttributeFormSection';
import { WarehouseProductUnitField } from './WarehouseProductUnitField';

import classes from './styles/index.module.css';

export const WarehouseProductsGeneratorForm: FC<
  WarehouseProductsGeneratorFormProps
> = ({ onGeneratedProductsCallback }) => {
  const { translate } = useTranslation();

  const { limitValue } = usePaginationLimit();

  const { list } = useCachedPaginationAPI<Attribute>(
    endpoints.attributes.root,
    {
      limit: limitValue,
    },
  );

  const { handleFormSubmit } = useWarehouseProductsGeneratorFormSubmit({
    onGeneratedProducts: onGeneratedProductsCallback,
  });

  const { control, setValue, getValues, handleSubmit } =
    useWarehouseProductsGeneratorForm({
      defaultValues: {},
      submitHandler: handleFormSubmit,
    });

  return (
    <Form onSubmit={handleSubmit}>
      <FormContent>
        <GridRowBalancer columns={2} elementRows={4}>
          <MultiLanguageInputAdapter
            isRequired
            name={warehouseProductsGeneratorFormFields.name}
            placeholderTranslation="warehouseProduct.name.description"
            label={translate('warehouseProduct.name')}
            control={control}
            columnIndex={1}
          />
          <WarehouseProductUnitField
            name={warehouseProductsGeneratorFormFields.unit}
            control={control}
          />
        </GridRowBalancer>
      </FormContent>
      <FormContent>
        <FormDescription>
          {translate('warehouseProducts.generate.form.description')}
        </FormDescription>
      </FormContent>
      <FormContent>
        <div className={classes.generator__attributes}>
          {list?.map((attribute) => {
            return (
              <WarehouseProductsGeneratorAttributeFormSection
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
            {translate('warehouseProduct.generateOne')}
          </Button>
          <Button
            variant="primary"
            type="submit"
            name={buttonNames.manyProducts}
          >
            {translate('warehouseProduct.generateMany')}
          </Button>
        </ButtonsGroup>
      </FormContent>
    </Form>
  );
};
