import { FC } from 'react';

import { Button } from '../../../../components/Button';
import { Form, FormContent } from '../../../../components/FormFields';
import {
  CheckboxAdapter,
  InputAdapter,
  MultiLanguageInputAdapter,
} from '../../../../components/FormFieldsAdapter';
import { GridRowBalancer } from '../../../../components/GridRowBalancer';
import { useTranslation } from '../../../../components/IntlProvider';
import { attributesFormFields } from './constants';
import { useAttributeForm } from './hooks';
import { AttributeFormProps } from './types';

export const AttributeForm: FC<AttributeFormProps> = ({
  submitText,
  isReadOnly,
  defaultValues,
  handleFormSubmit,
}) => {
  const { translate } = useTranslation();

  const { control, handleSubmit } = useAttributeForm({
    defaultValues,
    shouldReset: isReadOnly,
    submitHandler: handleFormSubmit,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <GridRowBalancer columns={2} elementRows={4}>
        <MultiLanguageInputAdapter
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesFormFields.name}
          placeholderTranslation="attribute.name.description"
          label={translate('attribute.name')}
          control={control}
          columnIndex={1}
        />
        <InputAdapter
          type="number"
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesFormFields.sortOrder}
          placeholder={translate('attribute.sortOrder.description')}
          label={translate('sortOrder')}
          control={control}
          columnIndex={2}
        />
        <InputAdapter
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesFormFields.seoName}
          label={translate('attribute.seoName')}
          placeholder={translate('attribute.seoName.description')}
          control={control}
          columnIndex={3}
        />
        <CheckboxAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesFormFields.isActive}
          label={translate('attribute.active')}
          control={control}
          columnIndex={4}
        />
      </GridRowBalancer>
      {!isReadOnly && (
        <FormContent>
          <Button variant="primary" type="submit">
            {submitText}
          </Button>
        </FormContent>
      )}
    </Form>
  );
};
