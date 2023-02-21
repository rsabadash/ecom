import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
} from '../../../../hooks/useCustomForm';
import { useCustomForm } from '../../../../hooks';
import { AttributeVariantFormValues } from '../types';
import { mainTranslationRequired } from '../../../../validations/translations';

type UseAttributeVariantFromProps = Pick<
  UseCustomFormProps<AttributeVariantFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<AttributeVariantFormValues>;
};

type UseAttributeVariantFromReturn = Pick<
  UseCustomFormReturn<AttributeVariantFormValues>,
  'control' | 'handleSubmit'
>;

type UseAttributeVariantForm = (
  props: UseAttributeVariantFromProps,
) => UseAttributeVariantFromReturn;

const schema = yup.object().shape({
  name: yup
    .object()
    .shape(
      mainTranslationRequired({
        uk: 'attribute.variant.name.error.required',
      }),
    )
    .required(),
});

export const useAttributeVariantForm: UseAttributeVariantForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}) => {
  const { control, handleSubmit } = useCustomForm<AttributeVariantFormValues>({
    formProps: {
      resolver: yupResolver(schema),
      defaultValues: defaultValues,
    },
    shouldReset,
    submitHandler,
  });

  return {
    control,
    handleSubmit,
  };
};
