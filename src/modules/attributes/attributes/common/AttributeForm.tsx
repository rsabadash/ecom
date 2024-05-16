import { FC } from 'react';

import { Button, ButtonsGroup } from '../../../../components/Button';
import { Form, FormContent } from '../../../../components/FormFields';
import {
  CheckboxAdapter,
  InputAdapter,
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
  handleFormReset,
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
        <InputAdapter
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesFormFields.name}
          label={translate('attribute.name')}
          placeholder={translate('attribute.name.description')}
          control={control}
          columnIndex={1}
        />
        <InputAdapter
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesFormFields.seoName}
          label={translate('attribute.seoName')}
          placeholder={translate('attribute.seoName.description')}
          control={control}
          columnIndex={2}
        />
        <CheckboxAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={attributesFormFields.isActive}
          label={translate('attribute.active')}
          control={control}
          columnIndex={3}
        />
      </GridRowBalancer>
      {!isReadOnly && (
        <FormContent>
          <ButtonsGroup>
            <Button variant="primary" type="submit">
              {submitText}
            </Button>
            <Button variant="theme" onClick={handleFormReset}>
              {translate('cancel')}
            </Button>
          </ButtonsGroup>
        </FormContent>
      )}
    </Form>
  );
};
