import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
} from '../../../hooks/useCustomForm';
import { useCustomForm } from '../../../hooks';
import { CategoryFormValues } from '../types';
import { mainTranslationRequired } from '../../../validations/translations';

type UseCategoryFromProps = Pick<
  UseCustomFormProps<CategoryFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<CategoryFormValues>;
};

type UseCategoryFromReturn = Pick<
  UseCustomFormReturn<CategoryFormValues>,
  'control' | 'handleSubmit'
>;

type UseCategoryForm = (props: UseCategoryFromProps) => UseCategoryFromReturn;

const schema = yup.object().shape({
  name: yup
    .object()
    .shape(
      mainTranslationRequired({
        uk: 'category.name.error.required',
      }),
    )
    .required(),
});

export const useCategoryForm: UseCategoryForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}) => {
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