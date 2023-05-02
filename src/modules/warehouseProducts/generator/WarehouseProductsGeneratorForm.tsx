import { FC } from 'react';
import {
  Form,
  FormContent,
  FormDescription,
} from '../../../components/FormFields';
import {
  useWarehouseProductsGeneratorForm,
  useWarehouseProductsGeneratorFormSubmit,
} from './hooks';
import { MultiLanguageInputAdapter } from '../../../components/FormFieldsAdapter';
import { buttonNames, warehouseProductsGeneratorFormFields } from './constants';
import { useCachedAPI } from '../../../hooks';
import { endpoints } from '../../../common/constants/api';
import { WarehouseProductsGeneratorFormProps } from './types';
import { WarehouseProductsGeneratorAttributeFormSection } from './WarehouseProductsGeneratorAttributeFormSection';
import { Button, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { Attribute } from '../../attributes/attributes/types';
import { GridRowBalancer } from '../../../components/GridRowBalancer';
import { WarehouseProductUnitField } from './WarehouseProductUnitField';

export const WarehouseProductsGeneratorForm: FC<
  WarehouseProductsGeneratorFormProps
> = ({ onSuccessSubmit }) => {
  const { translate } = useTranslation();

  const { data: attributes } = useCachedAPI<Attribute[]>(
    endpoints.attributes.root,
  );

  const { handleFormSubmit } = useWarehouseProductsGeneratorFormSubmit({
    onSuccess: onSuccessSubmit,
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
        {attributes?.map((attribute) => {
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
