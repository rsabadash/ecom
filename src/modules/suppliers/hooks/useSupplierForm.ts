import { SupplierFormValues } from '../types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseCustomFormProps } from '../../../hooks/useCustomForm';
import { useCustomForm } from '../../../hooks';
import { supplierFormFields } from '../constants';

type UseCategoriesFromProps = Pick<
  UseCustomFormProps<SupplierFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<SupplierFormValues>;
};

const schema = yup.object().shape({
  [supplierFormFields.name]: yup.string().required().min(3).max(50),
  [supplierFormFields.note]: yup.string().max(1024),
  [supplierFormFields.phoneNumber]: yup.string().length(10).nullable(),
});

export const useSupplierForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseCategoriesFromProps) => {
  const { control, handleSubmit } = useCustomForm<SupplierFormValues>({
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
