import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object, ObjectSchema, string } from 'yup';

import { URL_SLUG } from '../../../../../common/constants/regex';
import { useCustomForm } from '../../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
} from '../../../../../common/hooks/useCustomForm';
import { VariantFormValues } from '../types';

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

const schema: ObjectSchema<VariantFormValues> = object({
  name: string().required('variant.name.error.required'),
  seoName: string()
    .matches(URL_SLUG, 'variant.seoName.error.symbol')
    .required('variant.seoName.error.required'),
  isActive: boolean().required(),
});

export const useVariantForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseVariantFromProps): UseVariantFromReturn => {
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
