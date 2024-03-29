import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { URL_SLUG } from '../../../../common/constants/regex';
import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../common/hooks/useCustomForm';
import { mainTranslationRequired } from '../../../../validations/translations';
import { CategoryFormDefaultValues, CategoryFormValues } from '../types';

type UseCategoryFromProps = Pick<
  UseCustomFormProps<CategoryFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: CategoryFormDefaultValues;
};

type UseCategoryFromReturn = Pick<
  UseCustomFormReturn<CategoryFormValues>,
  'control' | 'handleSubmit'
>;

const schema = yup.object().shape<YupSchemaKey<CategoryFormValues>>({
  name: yup
    .object()
    .shape(
      mainTranslationRequired({
        uk: 'category.name.error.required',
      }),
    )
    .required(),
  seoName: yup
    .string()
    .nullable()
    .matches(URL_SLUG, 'category.seoName.error.symbol')
    .required('category.seoName.error.required'),
});

export const useCategoryForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseCategoryFromProps): UseCategoryFromReturn => {
  const { control, handleSubmit } = useCustomForm<CategoryFormValues>({
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
