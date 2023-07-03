import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../common/hooks/useCustomForm';
import { useCustomForm } from '../../../../common/hooks';
import { VariantFormValues } from '../types';
import { mainTranslationRequired } from '../../../../validations/translations';
import { URL_SLUG } from '../../../../common/constants/regex';

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
        uk: 'attribute.variant.name.error.required',
      }),
    )
    .required(),
  seoName: yup
    .string()
    .nullable()
    .matches(URL_SLUG, 'attribute.variant.seoName.error.symbol')
    .required('attribute.variant.seoName.error.required'),
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
