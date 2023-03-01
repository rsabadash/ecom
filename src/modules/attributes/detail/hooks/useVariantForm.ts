import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../hooks/useCustomForm';
import { useCustomForm } from '../../../../hooks';
import { VariantFormValues } from '../types';
import { mainTranslationRequired } from '../../../../validations/translations';

type UseVariantFromProps = Pick<
  UseCustomFormProps<VariantFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<VariantFormValues>;
};

type UseVariantFromReturn = Pick<
  UseCustomFormReturn<VariantFormValues>,
  'control' | 'handleSubmit'
>;

type UseVariantForm = (props: UseVariantFromProps) => UseVariantFromReturn;

const schema = yup.object().shape<YupSchemaKey<VariantFormValues>>({
  name: yup
    .object()
    .shape(
      mainTranslationRequired({
        uk: 'attribute.variant.name.error.required',
      }),
    )
    .required(),
});

export const useVariantForm: UseVariantForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}) => {
  const { control, handleSubmit } = useCustomForm<VariantFormValues>({
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
