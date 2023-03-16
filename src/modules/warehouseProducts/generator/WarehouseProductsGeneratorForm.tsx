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
import { warehouseProductsGeneratorFormFields } from './constants';
import { useCachedAPI } from '../../../hooks';
import { endpoints } from '../../../common/constants/api';
import { WarehouseProductsGeneratorFormProps } from './types';
import { WarehouseProductsGeneratorAttributeFormSection } from './WarehouseProductsGeneratorAttributeFormSection';
import { Button } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { Attribute } from '../../attributes/attributes/types';

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
        <MultiLanguageInputAdapter
          isRequired
          name={warehouseProductsGeneratorFormFields.name}
          placeholderTranslation="warehouseProducts.name.description"
          label={translate('warehouseProducts.name')}
          control={control}
        />
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
        <FormDescription>
          {translate('warehouseProducts.generate.form.description')}
        </FormDescription>
      </FormContent>
      <FormContent>
        <Button variant="primary" type="submit">
          {translate('generate')}
        </Button>
      </FormContent>
    </Form>
  );
};
