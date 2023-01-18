import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseCustomFormProps } from '../../../hooks/useCustomForm';
import { useCustomForm } from '../../../hooks';
import { CategoryFormValues } from '../types';
import { mainTranslationRequired } from '../../../validations/translations';

type UseCategoriesFromProps = Pick<
  UseCustomFormProps<CategoryFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<CategoryFormValues>;
};

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

export const useCategoriesFrom = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseCategoriesFromProps) => {
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
