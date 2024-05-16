import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object, ObjectSchema, string } from 'yup';

import { URL_SLUG } from '../../../../common/constants/regex';
import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
} from '../../../../common/hooks/useCustomForm';
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

const schema: ObjectSchema<CategoryFormValues> = object({
  name: string().required('category.name.error.required'),
  seoName: string()
    .matches(URL_SLUG, 'category.seoName.error.symbol')
    .required('category.seoName.error.required'),
  isActive: boolean().required(),
  parent: object({
    id: string().required(),
    value: string().required(),
  })
    .required()
    .nullable(),
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
