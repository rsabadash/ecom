import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { URL_SLUG } from '../../../../../common/constants/regex';
import { useCustomForm } from '../../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../../common/hooks/useCustomForm';
import { mainTranslationRequired } from '../../../../../validations/translations';
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

const schema = yup.object().shape<YupSchemaKey<VariantFormValues>>({
  name: yup
    .object()
    .shape(
      mainTranslationRequired({
        uk: 'variant.name.error.required',
      }),
    )
    .required(),
  seoName: yup
    .string()
    .nullable()
    .matches(URL_SLUG, 'variant.seoName.error.symbol')
    .required('variant.seoName.error.required'),
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
